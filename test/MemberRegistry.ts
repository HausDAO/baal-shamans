import { expect } from 'chai';
import { ContractTransaction } from 'ethers';
import { deployments, ethers } from 'hardhat';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Baal, Loot, Shares } from '@daohaus/baal-contracts';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';

import {
  baalSetup,
  encodeMultiAction,
  ProposalType,
  setShamanProposal,
  SHAMAN_PERMISSIONS,
  Signer,
  submitAndProcessProposal,
} from '@daohaus/baal-contracts/hardhat';
import {
  GnosisSafe,
  MultiSend,
  TestERC20,
  PGRegistry,
} from '../src/types';

type RegistrySetup = {
  memberRegistry: PGRegistry;
}

const rgaddrsUnsorted = [
  "0xced608aa29bb92185d9b6340adcbfa263dae075b",
  "0xd26a3f686d43f2a62ba9eae2ff77e9f516d945b9",
  "0x83ab8e31df35aa3281d630529c6f4bf5ac7f7abf",
  "0x146cfed833cc926b16b0da9257e8a281c2add9f3",
  "0x131fde92e4e88fa0746d9aba3dd4ec8aac1786a6",
  "0x0f10f27fbe3622e7d4bdf1f141c6e50ed8845af6",
  "0x66b1de0f14a0ce971f7f248415063d44caf19398",
  "0x6b0b5a413286c98ef8bc6de3dc2541e42863c43b",
  "0x8f942eced007bd3976927b7958b50df126feecb5",
  "0x20efcd9b9ade8bd586f840c83a6d8dd8c1d6623b",
  "0xdf73fe01dfddb55a900b947c5726b2e54dddd95a",
  "0xa3564677fc4907a15c9a7eae1dbc1ae9ac57b8e1",
  "0xffadc07f1bfb127f4312e8652fe94ab0c771b54d",
  "0xb53b0255895c4f9e3a185e484e5b674bccfbc076",
  "0x15c6ac4cf1b5e49c44332fb0a1043ccab19db80a",
  "0x06134ad890b6edb42bc0487c4e8dbbc17e3e0326",
  "0xc746708e27c5a8013fe8a9c62af17f64610acdfc",
  "0x9583648c314cdf666f4f555299db3b36f5d5b2f9",
  "0x68d36dcbdd7bbf206e27134f28103abe7cf972df",
  "0xfacef700458d4fc9746f7f3e0d37b462711ff09e",
  "0xf925fdaea552d36a5291335941ab7a046f960a80",
  "0xf7f189082878846c11a94ddac51c41afc7a7c772",
  "0xef42cf85be6adf3081ada73af87e27996046fe63",
  "0xe9a82a8a6e543890f60f3bca8685f56dc89aeb48",
  "0xe8adaea0ba507a28d1309051beceb4db7fe377af",
  "0xe775f37efe72d5a695b23e6ea7769f98cfbfaeb4",
  "0xe4cc688726dd0a1f8c464054ea1a1218d0cd9fc4",
  "0xda5b2cd0d0bb26e79fb3210233ddabdb7de131c9",
  "0x865c2f85c9fea1c6ac7f53de07554d68cb92ed88",
  "0x851fb899da7f80c211d9b8e5f231fb3bc9eca41a",
  "0x81aaa9a7a8358cc2971b9b8de72acce6d7862bc8",
  "0x818ff73a5d881c27a945be944973156c01141232",
  "0x756ee8b8e898d497043c2320d9909f1dd5a7077f",
  "0x710e2f9d630516d3afdd053de584f1fa421e84bc",
  "0x70c58b28f5e39da89bee0e6e8623e3faf51f0ed1",
  "0xd8c1f97348da216c2ded7a3a92274f2ff5cf37b2",
  "0xd714dd60e22bbb1cbafd0e40de5cfa7bbdd3f3c8",
  "0xd3e9d60e4e4de615124d5239219f32946d10151d",
  "0xce7298e5ef1ae8af0573edc2ebd03ab0f837e214",
  "0xcbbd18d3ac27ab0fffd04bccd091b2802c92e0ca",
  "0xcb42ac441fcade3935243ea118701f39aa004486",
  "0xca7a1a193a02e0520b6b745cd2eb24967c27ca00",
  "0xc7f459c7edcf9333d223bd1c346f46819403ca06",
  "0xc2013c235cf746a8164747e25254c7b538864e10",
  "0xb4135c81b194cae8dd2c4426527e880f95840acc",
  "0xb2f4b16595e02a9721f97e3e30fb5bbbf73f5f54",
  "0xafd5f60aa8eb4f488eaa0ef98c1c5b0645d9a0a0",
  "0xa5741cb7cfba784bcd07196d862558bc0c42a890",
  "0xa15ca74e65bf72730811abf95163e89ad9b9dff6",
  "0x9d06abcb6bf6ba8284255ce1d4cf965a04810336",
  "0xbfc7cae0fad9b346270ae8fde24827d2d779ef07",
  "0x1dac51886d5b461fccc784ad3813a5969dd42e6f",
  "0x5a9e792143bf2708b4765c144451dca54f559a19",
  "0xe68967c95f5a9bccfdd711a2cbc23ec958f147ef",
  "0x956d5740b3477f0b46dae26753b07ecbd8055908",
  "0x6dc43be93a8b5fd37dc16f24872babc6da5e5e3e",
  "0x6d97d65adff6771b31671443a6b9512104312d3d",
  "0x5f350bf5fee8e254d6077f8661e9c7b83a30364e",
  "0x5bb3e1774923b75ecb804e2559149bbd2a39a414",
  "0x5b93ff82faaf241c15997ea3975419dddd8362c5",
  "0x58f123bd4261ea25955b362be57d89f4b6e7110a",
  "0x54becc7560a7be76d72ed76a1f5fee6c5a2a7ab6",
  "0x4fafa767c9cb71394875c139d43aee7799748908",
  "0x4b037687c1c5159285a7defad3681f8e123d2478",
  "0x4059457092cc3812d56676df6a75fd21204fbe2f",
  "0x3839acf1ee7699d1f46b1be840d8ad8317fdf757",
  "0x2c3dd65e94f97b2a25239eddffd2e192c08769b8",
  "0x27c72e4bd23c910218d8f06c4a1742e06657c874",
  "0x224aba5d489675a7bd3ce07786fada466b46fa0f",
  "0x1e9c89aff77215f3ad26bffe0c50d4fdeba6a352",
  "0x1d076fcf1598c285d1c2f0685202afacdbcb0832",
  "0x1c0aa8ccd568d90d61659f060d1bfb1e6f855a20",
  "0x1a9cee6e1d21c3c09fb83a980ea54299f01920cd",
  "0x164ba6d1e6dd5f937908c34137d271ea3852c214",
  "0x0eabffd8ce94ab2387fc44ba32642af0c58af433",
  "0x08913515803c69ee3c2b8bdff49cf53baa1694d6",
  "0x06535a967d958dea135f6b50056362947ae5754b",
  "0xb4c3a698874b625df289e97f718206701c1f4c0f",
  "0x60959ed8307ee2b0d04306f6b319aeee8864f1ee",
];
  
const rgSorted = rgaddrsUnsorted.slice();
rgSorted.sort((a, b) => {
  return parseInt(a.slice(2), 16) - parseInt(b.slice(2), 16);
});

const rgShares = rgaddrsUnsorted.map(() => ethers.utils.parseUnits("1.0", "ether"));
// get a bunch of random numbers and 0s
const rgMods = rgaddrsUnsorted.map((item, idx) => idx % 5 ? 0 : Math.floor(Math.random() * 100));
const rgDates = rgaddrsUnsorted.map(() => Math.floor(Date.now() / 1000) - 60 * 60 * 24);
  

const gasStats = async (name: string, tx: ContractTransaction) => {
  const rec = await tx.wait();
  // console.log(
  //   name,
  //   "used",
  //   rec.gasUsed.toString(),
  //   "cost@15",
  //   ethers.utils.formatEther(rec.gasUsed.mul(15000000000))
  // );
}

const newBatchMemberAndProcess = async (
  baal: Baal,
  memberRegistry: PGRegistry,
  multisend: MultiSend,
  memberList: Array<string> = rgaddrsUnsorted,
  shares: Array<BigNumberish> = rgShares,
  mods: Array<number> = rgMods,
  dates: Array<number> = rgDates
)=> {
  const newDaoMember = baal.interface.encodeFunctionData('mintShares', [
    memberList,
    shares
  ]);
  const newRegistryMember = memberRegistry.interface.encodeFunctionData(
    'batchNewMember',
    [
      memberList,
      mods,
      dates,
    ]
  );

  const encodedAction = encodeMultiAction(
    multisend,
    [
        // newDaoMember, 
        newRegistryMember],
    [
        // baal.address, 
        memberRegistry.address],
    [
        // BigNumber.from(0), 
        BigNumber.from(0)],
    [
        // 0, 
        0,
    ]
  );

  const proposal: ProposalType = {
    baalGas: 0,
    data: '',
    details: 'New Member Batch',
    expiration: 0,
    flag: 0,
  };

  const proposalId = await baal.proposalCount() + 1;
  const tx = await submitAndProcessProposal({
    baal,
    encodedAction,
    proposal,
    proposalId,
  });
  gasStats(`batch member ${memberList.length}`, tx);
  return proposalId;
};

const newMemberAndProcess = async (
  baal: Baal,
  memberAddress: string,
  memberRegistry: PGRegistry,
  multisend: MultiSend
) => {
  const newDaoMember = baal.interface.encodeFunctionData("mintShares", [
    [memberAddress],
    [ethers.utils.parseUnits('1.0', 'ether')], // 1 share
  ]);

  const newRegistryMember = memberRegistry.interface.encodeFunctionData(
    'setNewMember',
    [
      memberAddress,
      100,
      Math.floor(Date.now() / 1000) - 60 * 60 * 24, // 1 day ago
    ]
  );

  const encodedAction = encodeMultiAction(
    multisend,
    [newDaoMember, newRegistryMember],
    [baal.address, memberRegistry.address],
    [BigNumber.from(0), BigNumber.from(0)],
    [0, 0]
  );

  const proposal: ProposalType = {
    baalGas: 0,
    data: '',
    details: 'New Member',
    expiration: 0,
    flag: 0,
  };

  const proposalId = await baal.proposalCount() + 1;
  await submitAndProcessProposal({
    baal,
    encodedAction,
    proposal,
    proposalId,
  });
  return proposalId;
};

const editMemberAndProcess = async function (
  baal: Baal,
  memberAddress: string,
  memberRegistry: PGRegistry,
  multisend: MultiSend
) {
  const editRegistryMember = memberRegistry.interface.encodeFunctionData(
    'updateMember',
    [memberAddress, 0]
  );

  const encodedAction = encodeMultiAction(
    multisend,
    [editRegistryMember],
    [memberRegistry.address],
    [BigNumber.from(0)],
    [0]
  );
  const proposal: ProposalType = {
    baalGas: 0,
    data: '',
    details: 'New Member',
    expiration: 0,
    flag: 0,
  };
  const proposalId = await baal.proposalCount() + 1;
  await submitAndProcessProposal({
    baal,
    encodedAction,
    proposal,
    proposalId,
  });
  return proposalId;
};

describe("PGRegistry", function () {
  let baal: Baal;
  let lootToken: Loot;
  let sharesToken: Shares;
  let multisend: MultiSend;

  let token: TestERC20;

  let gnosisSafe: GnosisSafe;

  let memberRegistry: PGRegistry;

  const yes = true;
  const no = false;

  const shamanPermissions = SHAMAN_PERMISSIONS.ALL; // 7

  let users: {
    [key: string]: Signer;
  };

  beforeEach(async function () {
    const {
      Baal,
      GnosisSafe,
      Loot,
      Shares,
      MultiSend,
      DAI,
      signers
    } = await baalSetup({});

    baal = Baal;
    gnosisSafe = GnosisSafe;
    lootToken = Loot;
    sharesToken = Shares;
    multisend = MultiSend;
    token = DAI;
    users = signers;


    const registrySetup = deployments.createFixture<RegistrySetup, any>(
      async (hre: HardhatRuntimeEnvironment, options?: any
    ) => {
      const { getNamedAccounts } = hre;
      const { deployer } = await getNamedAccounts();

      // TODO: mock splits
      const mockDeployed = await deployments.deploy('MockSplits', {
        contract: 'MockSplits',
        from: deployer,
        args: [],
        log: false,
      });

      // second address id placeholder for now
      const registryDeployed = await deployments.deploy('PGRegistry', {
        contract: 'PGRegistry',
        from: deployer,
        args: [mockDeployed.address, users.s3.address],
        log: false,
      });

      const memberRegistry = (await ethers.getContractAt('PGRegistry', registryDeployed.address, deployer) as PGRegistry);
      await memberRegistry.transferOwnership(gnosisSafe.address);
      return {
        memberRegistry
      };
    });

    const setup = await registrySetup();
    memberRegistry = setup.memberRegistry;

    await setShamanProposal(baal, multisend, memberRegistry.address, shamanPermissions);
  });

  describe("member registry", function () {

    it("adds new member", async () => {
      const proposalId = await newMemberAndProcess(
        baal.connect(await ethers.getSigner(users.summoner.address)),
        users.s1.address,
        memberRegistry,
        multisend
      );
      const s1Balance = await sharesToken.balanceOf(users.s1.address);
      const s1RegistryId = await memberRegistry.memberIdxs(users.s1.address);
      const s1RegistryMember = await memberRegistry.members(
        s1RegistryId.sub(1)
      );

      expect(s1Balance).to.equal(ethers.utils.parseUnits("1.0", "ether"));
      expect(s1RegistryMember.secondsActive).to.equal(0);
    });

    it("adds new member batch trigger", async () => {
      // console.log(rgaddrsUnsorted, rgshares, rgmods, rgdates);
      const proposalId = await newBatchMemberAndProcess(
        baal,
        memberRegistry,
        multisend
      );
      const count = await memberRegistry.count();

      const tx = await memberRegistry.updateSecondsActive();
      gasStats("batch update secs", tx);

      const memberList = await memberRegistry.getMembers();
      // console.log(memberList);
      const addrList = memberList.map((item: any) => item.account)

      addrList.sort((a: any, b: any) => {
        return parseInt(a.slice(2), 16) - parseInt(b.slice(2), 16);
      });

      const calculate = await memberRegistry.calculate(addrList);

      // console.log('calculate', calculate);

      // const total = Math.floor(memberList.reduce((acc: any, item: any) => {
      //   return acc + Math.sqrt(item.secondsActive);
      // }, 0));
      // console.log('total sqrts', total);

      const tx1 = await memberRegistry.updateSplits(addrList);
      gasStats("batch update secs", tx1);

    });

    it("edits member", async () => {
      const s1proposalId = await newMemberAndProcess(
        baal,
        users.s1.address,
        memberRegistry,
        multisend
      );
      const s2proposalId = await newMemberAndProcess(
        baal,
        users.s2.address,
        memberRegistry,
        multisend
      );
      await editMemberAndProcess(baal, users.s2.address, memberRegistry, multisend);
      const s2RegistryId = await memberRegistry.memberIdxs(users.s2.address);

      const s2RegistryMember = await memberRegistry.members(
        s2RegistryId.sub(1)
      );
      expect(s2RegistryMember.activityMultiplier).to.equal(0);
    });

    it("seconds update on all members member", async () => {
      const s1proposalId = await newMemberAndProcess(
        baal,
        users.s1.address,
        memberRegistry,
        multisend
      );
      const s2proposalId = await newMemberAndProcess(
        baal,
        users.s2.address,
        memberRegistry,
        multisend
      );
      await editMemberAndProcess(baal, users.s2.address, memberRegistry, multisend);
      const s2RegistryId = await memberRegistry.memberIdxs(users.s2.address);
      const s2RegistryMembera = await memberRegistry.members(
        s2RegistryId.sub(1)
      );
      const secsActive = s2RegistryMembera.secondsActive;

      const tx = await memberRegistry.updateSecondsActive();
      gasStats('update secs', tx);

      const tx1 = await memberRegistry.updateSplits([users.s1.address, users.s2.address]);
      gasStats('update splits', tx1);

      const s2RegistryMemberb = await memberRegistry.members(
        s2RegistryId.sub(1)
      );

      // same because adds 0 with update
      expect(s2RegistryMemberb.secondsActive).to.equal(secsActive);
    });

    it("trigger distribute shares", async () => {
      const s1proposalId = await newMemberAndProcess(
        baal,
        users.s1.address,
        memberRegistry,
        multisend
      );
      const s2proposalId = await newMemberAndProcess(
        baal,
        users.s2.address,
        memberRegistry,
        multisend
      );
      await editMemberAndProcess(baal, users.s2.address, memberRegistry, multisend);
      const s2RegistryId = await memberRegistry.memberIdxs(users.s2.address);
      const s2RegistryMembera = await memberRegistry.members(
        s2RegistryId.sub(1)
      );
      const secsActive = s2RegistryMembera.secondsActive;

      const s1RegistryId = await memberRegistry.memberIdxs(users.s1.address);
      const s1RegistryMember = await memberRegistry.members(
        s1RegistryId.sub(1)
      );

      const tx = await memberRegistry.updateSecondsActive();
      gasStats('update secs', tx);

      const tx1 = await memberRegistry.updateSplits([users.s1.address, users.s2.address]);
      gasStats('update splits', tx1);


      const s2RegistryMemberb = await memberRegistry.members(
        s2RegistryId.sub(1)
      );
      // TODO: test
      const s2Balance = await sharesToken.balanceOf(s2RegistryMembera.account);
      const s1Balance = await sharesToken.balanceOf(s1RegistryMember.account);
      // console.log('balances', s2Balance.toString(), s1Balance.toString());
    });
  });
});
