import { expect } from 'chai';
import { BigNumber, BigNumberish } from 'ethers';
import { ethers, getNamedAccounts, getUnnamedAccounts } from 'hardhat';
import { Baal, Shares } from '@daohaus/baal-contracts';
import {
  abiCoder,
  baalSetup,
  DAOSettings,
  defaultSummonSetup,
  encodeMultiAction,
  moveForwardPeriods,
  NewBaalParams,
  ProposalHelpers,
  SHAMAN_PERMISSIONS,
  Signer,
  setupBaal
} from '@daohaus/baal-contracts/hardhat';
import { calculateProxyAddress } from "@gnosis.pm/zodiac";

import { EarlyExecutionShaman, EarlyExecutionShamanSummoner, GnosisSafe, ModuleProxyFactory, MultiSend } from '../../src/types';

type ShamanArgs = {
  baalAddress: string;
  minimumQuorumPercent: BigNumberish;
  details: string;
};

const summonEarlyExecutionShaman = async (
  moduleProxyFactory: ModuleProxyFactory,
  shamanArgs: ShamanArgs,
  singleton: EarlyExecutionShaman,
  summoner: EarlyExecutionShamanSummoner
) => {
  const encodedInitParams = abiCoder.encode(
    ['address', 'uint256'],
    [shamanArgs.baalAddress, shamanArgs.minimumQuorumPercent]
  );
  const saltNonce = `0x${Buffer.from(ethers.utils.randomBytes(32)).toString("hex")}`;
  const initData = singleton.interface.encodeFunctionData("setUp", [encodedInitParams]);
  const proxyAddress = calculateProxyAddress(
    moduleProxyFactory,
    singleton.address,
    initData.toString(),
    saltNonce
  );

  const tx = await summoner.summon(
    shamanArgs.baalAddress,
    shamanArgs.minimumQuorumPercent,
    saltNonce,
    shamanArgs.details
  );
  await tx.wait();

  return proxyAddress;
};

const setupEarlyExecutionShaman = async (
  baal: Baal,
  multisend: MultiSend,
  shamanAddress: string,
  permission: BigNumberish = SHAMAN_PERMISSIONS.GOVERNANCE,
  daoSettings: DAOSettings,
  extraSeconds = 2,
) => {
  const setShaman = baal.interface.encodeFunctionData('setShamans', [
    [shamanAddress],
    [permission],
  ]);

  const avatar = await baal.avatar();

  const safe = (await ethers.getContractAt("GnosisSafe", avatar)) as GnosisSafe;
  const enableModuleCalldata = safe.interface.encodeFunctionData("enableModule", [shamanAddress]);

  const execFromModuleCalldata = safe.interface.encodeFunctionData(
    "execTransactionFromModule",
    [avatar, "0", enableModuleCalldata, "0"]
  );

  const executeAsBaal = baal.interface.encodeFunctionData('executeAsBaal', [
    avatar,
    "0",
    execFromModuleCalldata,
  ]);

  const setShamanAction = encodeMultiAction(
    multisend,
    [setShaman, executeAsBaal],
    [baal.address, baal.address],
    [BigNumber.from(0), BigNumber.from(0)],
    [0, 0]
  );

  // ----
  let tx = await baal.submitProposal(setShamanAction, 0, 0, '');
  await tx.wait();
  const proposalId = await baal.proposalCount();
  tx = await baal.submitVote(proposalId, true);
  await tx.wait();
  await moveForwardPeriods(daoSettings.VOTING_PERIOD_IN_SECONDS, extraSeconds);
  tx = await baal.processProposal(proposalId, setShamanAction);
  await tx.wait();
  return proposalId;
};

const updateGovernanceConfig = async ({
  baal,
  daoSettings,
  extraSeconds = 2,
  multisend,
  votingPeriod,
  gracePeriod,
  proposalOffering,
  quorumPercent,
  sponsorThreshold,
  minRetentionPercent,
  }: {
    baal: Baal,
    daoSettings: DAOSettings,
    extraSeconds?: number,
    multisend: MultiSend,
    votingPeriod?: BigNumberish;
    gracePeriod?: BigNumberish;
    proposalOffering?: BigNumberish;
    quorumPercent?: BigNumberish;
    sponsorThreshold?: BigNumberish;
    minRetentionPercent?: BigNumberish;
}) => {
  // uint32 public votingPeriod; /* voting period in seconds - amendable through 'period'[2] proposal*/
  // uint32 public gracePeriod; /*time delay after proposal voting period for processing*/
  // uint256 public proposalOffering; /* non-member proposal offering*/
  // uint256 public quorumPercent; /* minimum % of shares that must vote yes for it to pass*/
  // uint256 public sponsorThreshold; /* minimum number of shares to sponsor a proposal (not %)*/
  // uint256 public minRetentionPercent; /* auto-fails a proposal if more than (1- minRetentionPercent) * total shares exit before processing*/

  votingPeriod = votingPeriod || await baal.votingPeriod();
  gracePeriod = gracePeriod || await baal.gracePeriod();
  proposalOffering = proposalOffering || await baal.proposalOffering();
  quorumPercent = quorumPercent || await baal.quorumPercent();
  sponsorThreshold = sponsorThreshold || await baal.sponsorThreshold();
  minRetentionPercent = minRetentionPercent || await baal.minRetentionPercent();

  const encodedGovernanceParams = abiCoder.encode(
    ['uint32', 'uint32', 'uint256', 'uint256', 'uint256', 'uint256'],
    [votingPeriod, gracePeriod, proposalOffering, quorumPercent, sponsorThreshold, minRetentionPercent]
  );
  const setGovernanceConfig = baal.interface.encodeFunctionData('setGovernanceConfig', [encodedGovernanceParams]);

  const setShamanAction = encodeMultiAction(
    multisend,
    [setGovernanceConfig],
    [baal.address],
    [BigNumber.from(0)],
    [0, 0]
  );
  // ----
  let tx = await baal.submitProposal(setShamanAction, 0, 0, '');
  await tx.wait();
  const proposalId = await baal.proposalCount();
  tx = await baal.submitVote(proposalId, true);
  await tx.wait();
  await moveForwardPeriods(daoSettings.VOTING_PERIOD_IN_SECONDS, extraSeconds);
  tx = await baal.processProposal(proposalId, setShamanAction);
  await tx.wait();
  return proposalId;
}

describe('EarlyExecutionShaman', function () {
  let baal: Baal;
  let safe: GnosisSafe;
  let sharesToken: Shares;

  let template: EarlyExecutionShaman; 
  let summoner: EarlyExecutionShamanSummoner;

  let moduleProxyFactory: ModuleProxyFactory;
  let multisend: MultiSend;

  let currentDaoSettings: DAOSettings;

  let users: {
    [key: string]: Signer;
  };

  const yes = true;
  const no = false;

  const shamanPermissions = SHAMAN_PERMISSIONS.GOVERNANCE; // 4

  const defaultShamanArgs: ShamanArgs = {
    baalAddress: ethers.constants.AddressZero,
    minimumQuorumPercent: 25,
    details: 'EarlyExecute Shaman',
  };

  let proposalHelpers: ProposalHelpers;

  beforeEach(async function () {
    const {
      Baal,
      GnosisSafe,
      // Loot,
      Shares,
      MultiSend,
      // DAI,
      signers,
      helpers,
      daoSettings,
    } = await baalSetup({
      fixtureTags: ['EarlyExecution'],
      setupBaalOverride: async (params: NewBaalParams) => {
        console.log('OVERRIDE baal setup ******');
        const { deployer } = await getNamedAccounts();
        const [summonerMember, applicantMember, member1, member2] = await getUnnamedAccounts();
        summoner =
          (await ethers.getContract('EarlyExecutionShamanSummoner', deployer)) as EarlyExecutionShamanSummoner;
        template =
          (await ethers.getContractAt('EarlyExecutionShaman', await summoner.template(), deployer)) as EarlyExecutionShaman;

        const summonParams: NewBaalParams = {
          ...params,
          shamans: [[], []],
          shares: [
              [summonerMember, applicantMember, member1, member2],
              [defaultSummonSetup.shares, defaultSummonSetup.shares, defaultSummonSetup.shares, defaultSummonSetup.shares]
          ],
          loots: [[], []],
        }
        return setupBaal(summonParams);
      },
    });

    baal = Baal;
    safe = GnosisSafe;
    //   lootToken = Loot;
    sharesToken = Shares;
    multisend = MultiSend;
    //   token = DAI;
    users = signers;

    currentDaoSettings = daoSettings;

    proposalHelpers = helpers;

    const { deployer } = await getNamedAccounts();

    moduleProxyFactory = (await ethers.getContract('ModuleProxyFactory', deployer)) as ModuleProxyFactory;
  });

  describe('EarlyExecute Shaman Summoner', function () {
    let encodedInitParams: string;
    let saltNonce: string;

    beforeEach(() => {
      encodedInitParams = abiCoder.encode(
        ['address', 'uint256'],
        [baal.address, defaultShamanArgs.minimumQuorumPercent]
      );
      saltNonce = `0x${Buffer.from(ethers.utils.randomBytes(32)).toString("hex")}`;
    });

    it("Should be able to predict shaman address", async () => {
      const initData = template.interface.encodeFunctionData("setUp", [encodedInitParams]);
      const predictedAddress = calculateProxyAddress(
        moduleProxyFactory,
        template.address,
        initData.toString(),
        saltNonce
      );

      const tx = await summoner.summon(
        baal.address,
        defaultShamanArgs.minimumQuorumPercent,
        saltNonce,
        defaultShamanArgs.details
      );
      await expect(tx)
        .to.emit(summoner, 'EarlyExecutionShamanSummoned')
        .withArgs(baal.address, predictedAddress, defaultShamanArgs.minimumQuorumPercent, defaultShamanArgs.details);
    });
  });

  describe('EarlyExecute Shaman', function () {
    let earlyExecutionShaman: EarlyExecutionShaman;
    let shamanSetupProposalId: number;
    let governanceSetupProposalId: number;

    beforeEach(async () => {
      const proxyAddress = await summonEarlyExecutionShaman(
        moduleProxyFactory,
        {
          ...defaultShamanArgs,
          baalAddress: baal.address,
        },
        template,
        summoner
      );

      earlyExecutionShaman =
        (await ethers.getContractAt('EarlyExecutionShaman', proxyAddress, users.summoner.address)) as EarlyExecutionShaman;

      const pId = users.summoner.baal &&
        await setupEarlyExecutionShaman(
          users.summoner.baal,
          multisend,
          earlyExecutionShaman.address,
          SHAMAN_PERMISSIONS.GOVERNANCE,
          currentDaoSettings
        );
      if (pId) {
        shamanSetupProposalId = pId;
      }

      // TODO: update governance config
      const gId = users.summoner.baal &&
        await updateGovernanceConfig({
          baal: users.summoner.baal,
          daoSettings: currentDaoSettings,
          multisend,
          quorumPercent: BigNumber.from(100), // force 100% quorum from now on
        });
      
      if (gId) {
        governanceSetupProposalId = gId;
      }
    });

    it("Should have a successful shaman+dao setup proposals", async () => {
      // [cancelled, processed, passed, actionFailed]
      expect(await baal.getProposalStatus(shamanSetupProposalId)).to.have.same.ordered.members([ false, true, true, false ]);
      expect(await baal.getProposalStatus(governanceSetupProposalId)).to.have.same.ordered.members([ false, true, true, false ]);
    });

    it("Should have setup the module as shaman and safe module", async () => {
      expect(await baal.shamans(earlyExecutionShaman.address)).to.be.equal(BigNumber.from(SHAMAN_PERMISSIONS.GOVERNANCE));
      expect(await safe.isModuleEnabled(earlyExecutionShaman.address)).to.be.equal(true);
    });

    it("Should have a 100% quorum requirement in the dao", async () => {
      expect(await baal.quorumPercent()).to.be.equal(BigNumber.from(100));
    });

    it("Should not be able to process a dao proposal with a single voter", async () => {
      const mintShares = await baal.interface.encodeFunctionData("mintShares", [
        [users.summoner.address],
        [ethers.utils.parseEther("69")],
      ]);
      const encodedAction = encodeMultiAction(
        multisend,
        [mintShares],
        [baal.address],
        [BigNumber.from(0)],
        [0],
      );
  
      users.summoner.baal &&
        await proposalHelpers.submitAndProcessProposal({
          baal: users.summoner.baal,
          encodedAction,
          proposal: {
            flag: 1,
            // account: ethers.constants.AddressZero,
            data: "",
            details: "Should not pass",
            expiration: 0,
            baalGas: 0,
          },
        });
      const pId = await baal.proposalCount();
      const propStatus = await baal.getProposalStatus(pId);
      
      // [cancelled, processed, passed, actionFailed]
      expect(propStatus).to.have.same.ordered.members([ false, true, false, false ]);
    });

    it("", async () => {
      // TODO: case without sponsor
    });

    it("", async () => {
      // case with sponsor but threshold until proposal fails
    });

    it("Should be able to process a dao proposal with a single voter through early execution", async () => {
      const balanceBefore = await sharesToken.balanceOf(users.summoner.address);
      const mintAmt = ethers.utils.parseEther("69");
      const mintShares = await baal.interface.encodeFunctionData("mintShares", [
        [users.summoner.address],
        [mintAmt],
      ]);
      const encodedAction = encodeMultiAction(
        multisend,
        [mintShares],
        [baal.address],
        [BigNumber.from(0)],
        [0],
      );

      const proposal = {
        details: "Should early execute",
        expiration: 0,
        baalGas: 0,
      }

      const spTx = await earlyExecutionShaman.submitProposal(
        encodedAction,
        proposal.expiration,
        proposal.baalGas,
        proposal.details
      );
      await spTx.wait();
  
      const pId = await baal.proposalCount();
      let propStatus = await baal.getProposalStatus(pId);
      
      // [cancelled, processed, passed, actionFailed]
      expect(propStatus).to.have.same.ordered.members([ false, false, false, false ]);

      await expect(earlyExecutionShaman.checkEarlyExecution(pId)).to.be.revertedWithCustomError(earlyExecutionShaman, "EarlyExecutionShaman__Proposal_NoVotingPeriod");
      await expect(earlyExecutionShaman.earlyExecute(pId, encodedAction)).to.be.revertedWithCustomError(earlyExecutionShaman, "EarlyExecutionShaman__Proposal_NoVotingPeriod");

      // sponsor proposal
      const sTx = users.summoner.baal &&
        await users.summoner.baal.sponsorProposal(pId);
      await sTx?.wait();

      await expect(earlyExecutionShaman.checkEarlyExecution(pId)).to.be.revertedWithCustomError(earlyExecutionShaman, "EarlyExecutionShaman__Proposal_NoMinimumThreshold");
      await expect(earlyExecutionShaman.earlyExecute(pId, encodedAction)).to.be.revertedWithCustomError(earlyExecutionShaman, "EarlyExecutionShaman__Proposal_NoMinimumThreshold");

      // voting
      const vTx = users.summoner.baal &&
        await users.summoner.baal.submitVote(pId, true);
      await vTx?.wait();

      // early execute
      expect(await earlyExecutionShaman.checkEarlyExecution(pId)).to.be.equal(true);
      await expect(earlyExecutionShaman.earlyExecute(pId, encodedAction)).to.emit(earlyExecutionShaman, "ProposalEarlyExecuted").withArgs(pId, true);

      propStatus = await baal.getProposalStatus(pId);
      
      // [cancelled, processed, passed, actionFailed]
      expect(propStatus).to.have.same.ordered.members([ true, false, false, false ]);

      const balanceAfter = await sharesToken.balanceOf(users.summoner.address);
      expect(balanceAfter).to.be.equal(balanceBefore.add(mintAmt));
    });
  });
});
