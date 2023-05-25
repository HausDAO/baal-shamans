import { expect } from 'chai';
import { deployments, ethers/*, upgrades*/ } from 'hardhat';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Baal, Loot, Shares } from '@daohaus/baal-contracts';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';

import { MultiSend, TestERC20, DhSignalTCR } from '../src/types';
import { DhSignalTCRSummoner } from '../src/types/contracts/tcr/SignalTCR.sol/DhSignalTCRSummoner';
import { encodeMultiAction } from '../src/utils';
import { Signer, baalSetup, submitAndProcessProposal } from './utils';

type TCRSummonerSetup = {
  tcrSummoner: DhSignalTCRSummoner;
};

type TCRArgs = {
  details: string;
  endDate: BigNumberish;
};

const summonDhSignalTCR = async function (
  baal: Baal,
  dhSignalTCRSummoner: DhSignalTCRSummoner,
  tcrArgs: TCRArgs,
) {
  let signalAddress;
  let summonTx = await dhSignalTCRSummoner.summonSignalTCR(
    baal.address,
    tcrArgs.endDate,
    tcrArgs.details,
  );

  let result: any = await summonTx.wait();
  
  if (
    result?.events[2]?.args?.signal
  ) {
    // console.log('signal', result.events[2].args.signal);
    signalAddress = result.events[2].args.signal;
  }  
  return signalAddress;
};

describe('Signal TCR', function () {
  let baal: Baal;
  let lootToken: Loot;
  let sharesToken: Shares;
  let multisend: MultiSend;

  let token: TestERC20;

  let dhSignalTCRSummoner: DhSignalTCRSummoner;

  let users: {
    [key: string]: Signer;
  };

  const yes = true;
  const no = false;

  const defaultTCRArgs: TCRArgs = {
    endDate: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30), // 30 days from now
    details: 'SignalTCR'
  };

  const setSnapShot = async (baal: Baal, multisend: MultiSend) => {
    const sharesSnapshot = sharesToken.interface.encodeFunctionData(
      'snapshot'
    );
    const lootSnapshot = lootToken.interface.encodeFunctionData(
      'snapshot'
    );
    const snapshotSharesFromBaal = baal.interface.encodeFunctionData(
      'executeAsBaal',
      [sharesToken.address, 0, sharesSnapshot]
    );
    const snapshotLootFromBaal = baal.interface.encodeFunctionData(
      'executeAsBaal',
      [lootToken.address, 0, lootSnapshot]
    );

    const encodedAction = encodeMultiAction(
      multisend,
      [snapshotSharesFromBaal, snapshotLootFromBaal],
      [baal.address, baal.address],
      [BigNumber.from(0), BigNumber.from(0)],
      [0, 0]
    );

    const proposalId = await baal.proposalCount() + 1;

    await submitAndProcessProposal({
      baal,
      encodedAction,
      proposal: {
        flag: '0',
        data: '0x',
        details: `set Snapshot #${proposalId}`,
        expiration: '0',
        baalGas: '0',
      },
      proposalId,
    })
    // await baal.submitProposal(setupAction, 0, 0, '');
    
    // await baal.submitVote(proposalId, true);
    // await moveForwardPeriods(2);
    // await baal.processProposal(proposalId, setupAction);
    return proposalId;
  };

  beforeEach(async function () {
    const {
      Baal,
      Loot,
      Shares,
      MultiSend,
      DAI,
      signers
    } = await baalSetup({});

    baal = Baal;
    lootToken = Loot;
    sharesToken = Shares;
    multisend = MultiSend;
    token = DAI;
    users = signers;

    const onboarderSetup = deployments.createFixture<TCRSummonerSetup, any>(
      async (hre: HardhatRuntimeEnvironment, options?: any
    ) => {
        const { getNamedAccounts } = hre;
        const { deployer } = await getNamedAccounts();
        await deployments.fixture(['DhSignalTCR']);
        const summoner =
          (await ethers.getContract('DhSignalTCRSummoner', deployer)) as DhSignalTCRSummoner;
        return {
          tcrSummoner: summoner,
        };
    });
    const setup = await onboarderSetup();
    dhSignalTCRSummoner = setup.tcrSummoner;
  });

  describe('signal TCR', function () {
    it('setup', async () => {

      users.summoner.baal &&
        await setSnapShot(users.summoner.baal, multisend);

      const snid = await sharesToken.getCurrentSnapshotId();
      // console.log('snid', snid);
      
      const sum = await sharesToken.balanceOf(users.summoner.address);
      // console.log('sum', sum);
      
      const signalTCRAddress = await summonDhSignalTCR(
        baal,
        dhSignalTCRSummoner,
        defaultTCRArgs
      );
      // console.log(signalTCRAddress);
      
      const signalTCR = (
        await ethers.getContractAt(
          'DhSignalTCR',
          signalTCRAddress,
          users.summoner.address
        )
      ) as DhSignalTCR;

      await signalTCR.claim(users.summoner.address);

      const balance = await signalTCR.voterBalances(users.summoner.address);

      // console.log(balance);

      signalTCR.vote([{choiceId: '0x1234', amount: '100'}, {choiceId: '0x3456', amount: '50'}])

      const balance1 = await signalTCR.voterBalances(users.summoner.address);

      // console.log(balance1);

      signalTCR.vote([{choiceId: '0x1234', amount: '10'}, {choiceId: '0x3456', amount: '10'}])

      const balance2 = await signalTCR.voterBalances(users.summoner.address);

      // console.log(balance2);

      const votes = await signalTCR.getVotesForAddress(users.summoner.address);

      // console.log(votes);
    });

    it('mint loot on ...', async () => {
      // TODO:
    });
  });
});
