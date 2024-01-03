import { expect } from 'chai';
import { deployments, ethers, getNamedAccounts } from 'hardhat';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Baal, Loot, Shares } from '@daohaus/baal-contracts';
import {
  baalSetup,
  NewBaalParams,
  ProposalHelpers,
  SHAMAN_PERMISSIONS,
  Signer,
  setupBaal
} from '@daohaus/baal-contracts/hardhat';
import { BigNumber } from '@ethersproject/bignumber';

// Credential issued by by 0xd6fc34345bc8c8e5659a35bed9629d5558d48c4e
import DIDKitSignedCredential from '../mocks/BrightIDSignedCredential.json';

import { DocumentStruct, normalizeDIDCredential } from '../utils/credentials';
import { DIDStampVcVerifier, MultiSend, TestERC20, VCOnboarderShamanSummoner } from '../../src/types';

type VerifierSetup = {
  stampVerifier: DIDStampVcVerifier;
}

type OnboarderSetup = {
  credentialOwnerAddress: string;
  onboarderSummoner: VCOnboarderShamanSummoner;
} & VerifierSetup;

type VCOnboarderArgs = {
  vcVerifier: string; // VCVerifier address
  details: string;
  shares: boolean;
  amountPerCredential: BigNumber | string;
  tributeToken: string; // ERC20 token address | 0x
  minTribute: BigNumber | string; // BigNumber | string
}

const summonOnboarder = async function (
  baal: Baal,
  onboarderArgs: VCOnboarderArgs,
  onboarderSummoner: VCOnboarderShamanSummoner,
) {
  let onboarderAddress;
  let summonOnboarderTx = await onboarderSummoner.summonOnboarder(
    baal.address,
    onboarderArgs.vcVerifier,
    onboarderArgs.details,
    onboarderArgs.shares,
    onboarderArgs.amountPerCredential,
    onboarderArgs.tributeToken,
    onboarderArgs.minTribute,
  );
  let result = await summonOnboarderTx.wait();
  if (
    result &&
    result.events &&
    result.events[1] &&
    result.events[1].args &&
    result.events[1].args.onboarder
  ) {
    onboarderAddress = result.events[1].args.onboarder;
  }
  return onboarderAddress;
};

describe("PassportVCVerifier", function () {

  describe("DIDStampVcVerifier", function () {
    let didStampVCVerifier: DIDStampVcVerifier;

    beforeEach(async function () {

      const verifierSetup = deployments.createFixture<VerifierSetup, any>(
        async (hre: HardhatRuntimeEnvironment, options?: any
      ) => {
          const { deployments, ethers, getNamedAccounts } = hre;
          const { deployer } = await getNamedAccounts();
          await deployments.fixture(['DIDStampVcVerifier']);
          const stampVerifier = (await ethers.getContract('DIDStampVcVerifier', deployer) as DIDStampVcVerifier);
          return {
            stampVerifier,
          };
          
      });
      const setup = await verifierSetup();
      didStampVCVerifier = setup.stampVerifier;
    })

    it("should verify a didkit issued VC using the DIDStampVcVerifier smart contract", async () => {

      const { v, r, s } = ethers.utils.splitSignature(DIDKitSignedCredential.proof.proofValue);
      const normalizedDIDCredential = normalizeDIDCredential(DIDKitSignedCredential) as DocumentStruct;

      await expect(await didStampVCVerifier.verifyStampVc(normalizedDIDCredential, v, r, s)).to.emit(
        didStampVCVerifier,
        "Verified",
      ).withArgs(
        DIDKitSignedCredential.credentialSubject.id,
        DIDKitSignedCredential.credentialSubject.hash,
        DIDKitSignedCredential.credentialSubject.provider,
      );
    });
  });

  describe("VCOnboarder", function () {
    let baal: Baal;
    let lootToken: Loot;
    let sharesToken: Shares;
    let multisend: MultiSend;

    let credentialOwnerAddress: string;
    let token: TestERC20;

    let users: {
      [key: string]: Signer;
    };

    const shamanPermissions = SHAMAN_PERMISSIONS.ADMIN_MANAGER; // 3

    let didStampVCVerifier: DIDStampVcVerifier;
    let onboarderSummoner: VCOnboarderShamanSummoner;

    const defaultOnboarderArgs: VCOnboarderArgs = {
      vcVerifier: ethers.constants.AddressZero,
      details: "TestShaman",
      shares: true,
      amountPerCredential: ethers.utils.parseUnits("1.0", "ether"),
      tributeToken: ethers.constants.AddressZero,
      minTribute: "0",
    };

    let proposalHelpers: ProposalHelpers;
  
    beforeEach(async function () {
      const {
        Baal,
        Loot,
        Shares,
        MultiSend,
        DAI,
        signers,
        helpers,
      } = await baalSetup({
        fixtureTags: ['DIDStampVcVerifier', 'VCOnboarder'],
        setupBaalOverride: async (params: NewBaalParams) => {
          console.log('OVERRIDE baal setup ******');
          const { deployer } = await getNamedAccounts();
          credentialOwnerAddress = deployer;
          didStampVCVerifier = (await ethers.getContract('DIDStampVcVerifier', deployer) as DIDStampVcVerifier);
          onboarderSummoner =
            (await ethers.getContract('VCOnboarderShamanSummoner', deployer)) as VCOnboarderShamanSummoner;
          
          return setupBaal(params);
        },
      });
  
      baal = Baal;
      lootToken = Loot;
      sharesToken = Shares;
      multisend = MultiSend;
      users = signers;

      // const onboarderSetup = deployments.createFixture<OnboarderSetup, any>(
      //   async (hre: HardhatRuntimeEnvironment, options?: any
      // ) => {
      //     const { getNamedAccounts } = hre;
      //     const { deployer } = await getNamedAccounts();
      //     await deployments.fixture(['DIDStampVcVerifier', 'VCOnboarder']);
      //     const stampVerifier = (await ethers.getContract('DIDStampVcVerifier', deployer) as DIDStampVcVerifier);
      //     const summoner =
      //       (await ethers.getContract('VCOnboarderShamanSummoner', deployer)) as VCOnboarderShamanSummoner;
      //     return {
      //       credentialOwnerAddress: deployer,
      //       onboarderSummoner: summoner,
      //       stampVerifier,
      //     };
          
      // });
      // const setup = await onboarderSetup();
      // // NOTICE: Mock Signed credential is owned by the deployer address
      // credentialOwnerAddress = setup.credentialOwnerAddress;
      // onboarderSummoner = setup.onboarderSummoner;
      // didStampVCVerifier = setup.stampVerifier;

      token = DAI.connect(await ethers.getSigner(credentialOwnerAddress));

      proposalHelpers = helpers;
    });

    it("mint shares on sending eth", async () => {
      const onboarderArgs: VCOnboarderArgs = {
        ...defaultOnboarderArgs,
        vcVerifier: didStampVCVerifier.address,
      };

      let onboarderAddress = await summonOnboarder(
        baal,
        onboarderArgs,
        onboarderSummoner,
      );

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, onboarderAddress, shamanPermissions);

      const baalTotalSupplyBefore = await baal.totalSupply();
      const sharesBefore = await sharesToken.balanceOf(credentialOwnerAddress);

      const onboaderShaman = await ethers.getContractAt(
        'VCOnboarderShaman',
        onboarderAddress,
        credentialOwnerAddress
      );

      // Simulates credential signed by an issuer entity
      const { v, r, s } = ethers.utils.splitSignature(DIDKitSignedCredential.proof.proofValue);
      const normalizedDIDCredential = normalizeDIDCredential(DIDKitSignedCredential) as DocumentStruct;

      const onboardTx = await onboaderShaman.onboarder(
        normalizedDIDCredential,
        v, r, s,
        { value: onboarderArgs.minTribute },
      );

      await onboardTx.wait();

      const sharesAfter = await sharesToken.balanceOf(credentialOwnerAddress);
      const baalTotalSupplyAfter = await baal.totalSupply();

      expect(sharesAfter).to.equal(sharesBefore.add(onboarderArgs.amountPerCredential));
      expect(baalTotalSupplyAfter).to.equal(baalTotalSupplyBefore.add(onboarderArgs.amountPerCredential));
    });

    it("can't mint shares on sending tokens instead of eth", async () => {
      const onboarderArgs: VCOnboarderArgs = {
        ...defaultOnboarderArgs,
        vcVerifier: didStampVCVerifier.address,
      };

      let onboarderAddress = await summonOnboarder(
        baal,
        onboarderArgs,
        onboarderSummoner,
      );

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, onboarderAddress, shamanPermissions);

      const onboaderShaman = await ethers.getContractAt(
        'VCOnboarderShaman',
        onboarderAddress,
        credentialOwnerAddress
      );

      const { v, r, s } = ethers.utils.splitSignature(DIDKitSignedCredential.proof.proofValue);
      const normalizedDIDCredential = normalizeDIDCredential(DIDKitSignedCredential) as DocumentStruct;

      const onboardTx = onboaderShaman.onboarder20(
        normalizedDIDCredential,
        v, r, s,
        onboarderArgs.minTribute,
      );

      expect(onboardTx).to.revertedWith("!token");
    });

    it("mint loot on sending eth", async () => {
      const onboarderArgs: VCOnboarderArgs = {
        ...defaultOnboarderArgs,
        vcVerifier: didStampVCVerifier.address,
        shares: false,
      };

      let onboarderAddress = await summonOnboarder(
        baal,
        onboarderArgs,
        onboarderSummoner,
      );

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, onboarderAddress, shamanPermissions);

      const baalTotalSupplyBefore = await baal.totalSupply();
      const sharesBefore = await lootToken.balanceOf(credentialOwnerAddress);

      const onboaderShaman = await ethers.getContractAt(
        'VCOnboarderShaman',
        onboarderAddress,
        credentialOwnerAddress
      );

      const { v, r, s } = ethers.utils.splitSignature(DIDKitSignedCredential.proof.proofValue);
      const normalizedDIDCredential = normalizeDIDCredential(DIDKitSignedCredential) as DocumentStruct;

      const onboardTx = await onboaderShaman.onboarder(
        normalizedDIDCredential,
        v, r, s,
        { value: onboarderArgs.minTribute },
      );

      await onboardTx.wait();

      const sharesAfter = await lootToken.balanceOf(credentialOwnerAddress);
      const baalTotalSupplyAfter = await baal.totalSupply();

      expect(sharesAfter).to.equal(sharesBefore.add(onboarderArgs.amountPerCredential));
      expect(baalTotalSupplyAfter).to.equal(baalTotalSupplyBefore.add(onboarderArgs.amountPerCredential));
    });

    it("mint shares on sending token", async () => {
      const onboarderArgs: VCOnboarderArgs = {
        ...defaultOnboarderArgs,
        vcVerifier: didStampVCVerifier.address,
        tributeToken: token.address,
        minTribute: ethers.utils.parseUnits("1.0", "ether"),
      };

      let onboarderAddress = await summonOnboarder(
        baal,
        onboarderArgs,
        onboarderSummoner,
      );
      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, onboarderAddress, shamanPermissions);

      const balanceBefore = await token.balanceOf(credentialOwnerAddress);
      const baalTotalSupplyBefore = await baal.totalSupply();
      const sharesBefore = await sharesToken.balanceOf(credentialOwnerAddress);

      const onboaderShaman = await ethers.getContractAt(
        'VCOnboarderShaman',
        onboarderAddress,
        credentialOwnerAddress
      );

      // Approve allowance to the shaman contract
      const approveTx = await token.approve(onboaderShaman.address, onboarderArgs.minTribute);
      await approveTx.wait();

      const { v, r, s } = ethers.utils.splitSignature(DIDKitSignedCredential.proof.proofValue);
      const normalizedDIDCredential = normalizeDIDCredential(DIDKitSignedCredential) as DocumentStruct;

      const onboardTx = await onboaderShaman.onboarder20(
        normalizedDIDCredential,
        v, r, s,
        onboarderArgs.minTribute,
      );

      await onboardTx.wait();

      const balanceAfter = await token.balanceOf(credentialOwnerAddress);
      const sharesAfter = await sharesToken.balanceOf(credentialOwnerAddress);
      const baalTotalSupplyAfter = await baal.totalSupply();

      expect(balanceAfter).to.equal(balanceBefore.sub(onboarderArgs.minTribute));
      expect(sharesAfter).to.equal(sharesBefore.add(onboarderArgs.amountPerCredential));
      expect(baalTotalSupplyAfter).to.equal(baalTotalSupplyBefore.add(onboarderArgs.amountPerCredential));
    });

    it("can't mint shares on sending eth instead of tokens", async () => {
      const onboarderArgs: VCOnboarderArgs = {
        ...defaultOnboarderArgs,
        vcVerifier: didStampVCVerifier.address,
        tributeToken: token.address
      };

      let onboarderAddress = await summonOnboarder(
        baal,
        onboarderArgs,
        onboarderSummoner,
      );
      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, onboarderAddress, shamanPermissions);

      const onboaderShaman = await ethers.getContractAt(
        'VCOnboarderShaman',
        onboarderAddress,
        credentialOwnerAddress
      );

      const { v, r, s } = ethers.utils.splitSignature(DIDKitSignedCredential.proof.proofValue);
      const normalizedDIDCredential = normalizeDIDCredential(DIDKitSignedCredential) as DocumentStruct;

      const onboardTx = onboaderShaman.onboarder(
        normalizedDIDCredential,
        v, r, s,
        { value: onboarderArgs.minTribute },
      );

      expect(onboardTx).to.revertedWith("!native");
    });

    it("mint loot on sending token", async () => {
      const onboarderArgs: VCOnboarderArgs = {
        ...defaultOnboarderArgs,
        vcVerifier: didStampVCVerifier.address,
        shares: false,
        amountPerCredential: ethers.utils.parseUnits("1.0", "ether"),
        tributeToken: token.address,
        minTribute: ethers.utils.parseUnits("1.0", "ether"),
      };

      let onboarderAddress = await summonOnboarder(
        baal,
        onboarderArgs,
        onboarderSummoner,
      );
      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(users.summoner.baal, multisend, onboarderAddress, shamanPermissions);

      const balanceBefore = await token.balanceOf(credentialOwnerAddress);
      const baalTotalSupplyBefore = await baal.totalSupply();
      const sharesBefore = await lootToken.balanceOf(credentialOwnerAddress);

      const onboaderShaman = await ethers.getContractAt(
        'VCOnboarderShaman',
        onboarderAddress,
        credentialOwnerAddress
      );

      const approveTx = await token.approve(onboaderShaman.address, onboarderArgs.minTribute);
      await approveTx.wait();

      const { v, r, s } = ethers.utils.splitSignature(DIDKitSignedCredential.proof.proofValue);

      const normalizedDIDCredential = normalizeDIDCredential(DIDKitSignedCredential) as DocumentStruct;

      const onboardTx = await onboaderShaman.onboarder20(
        normalizedDIDCredential,
        v, r, s,
        onboarderArgs.minTribute,
      );

      await onboardTx.wait();

      const balanceAfter = await token.balanceOf(credentialOwnerAddress);
      const sharesAfter = await lootToken.balanceOf(credentialOwnerAddress);
      const baalTotalSupplyAfter = await baal.totalSupply();

      expect(balanceAfter).to.equal(balanceBefore.sub(onboarderArgs.minTribute));
      expect(sharesAfter).to.equal(sharesBefore.add(onboarderArgs.amountPerCredential));
      expect(baalTotalSupplyAfter).to.equal(baalTotalSupplyBefore.add(onboarderArgs.amountPerCredential));
    });

    it("can't mint more shares if credential was already vouched", async () => {
      const onboarderArgs: VCOnboarderArgs = {
        ...defaultOnboarderArgs,
        vcVerifier: didStampVCVerifier.address,
        shares: true,
        amountPerCredential: ethers.utils.parseUnits("1.0", "ether"),
        tributeToken: token.address,
        minTribute: ethers.utils.parseUnits("1.0", "ether"),
      };

      let onboarderAddress = await summonOnboarder(
        baal,
        onboarderArgs,
        onboarderSummoner,
      );

      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(baal, multisend, onboarderAddress, shamanPermissions);

      const balanceBefore = await token.balanceOf(credentialOwnerAddress);
      const baalTotalSupplyBefore = await baal.totalSupply();
      const sharesBefore = await sharesToken.balanceOf(credentialOwnerAddress);

      const onboaderShaman = await ethers.getContractAt(
        'VCOnboarderShaman',
        onboarderAddress,
        credentialOwnerAddress
      );

      const approveTx = await token.approve(onboaderShaman.address, onboarderArgs.minTribute);
      await approveTx.wait();

      const { v, r, s } = ethers.utils.splitSignature(DIDKitSignedCredential.proof.proofValue);
      const normalizedDIDCredential = normalizeDIDCredential(DIDKitSignedCredential) as DocumentStruct;

      const onboardTx = await onboaderShaman.onboarder20(
        normalizedDIDCredential,
        v, r, s,
        onboarderArgs.minTribute,
      );

      await onboardTx.wait();

      const balanceAfter = await token.balanceOf(credentialOwnerAddress);
      const sharesAfter = await sharesToken.balanceOf(credentialOwnerAddress);
      const baalTotalSupplyAfter = await baal.totalSupply();

      expect(balanceAfter).to.equal(balanceBefore.sub(onboarderArgs.minTribute));
      expect(sharesAfter).to.equal(sharesBefore.add(onboarderArgs.amountPerCredential));
      expect(baalTotalSupplyAfter).to.equal(baalTotalSupplyBefore.add(onboarderArgs.amountPerCredential));

      const moreSharesTx = onboaderShaman.onboarder20(
        normalizedDIDCredential,
        v, r, s,
        onboarderArgs.minTribute,
      );
      expect(moreSharesTx).to.revertedWith("AlreadyVouchedCredential");
    });
  });
})
