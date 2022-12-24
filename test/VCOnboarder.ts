// import { createCredential } from "../utils/didkitSign"
import { ContractFactory } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";


import { DocumentStruct } from "../types"
import { DIDStampVcVerifier, DIDStampVcVerifier__factory } from "../src/types";
import {
  MultiSend,
  MyToken,
  VCOnboarderShaman,
  VCOnboarderShamanSummoner,
} from "../src/types";
import { Baal } from "../src/types/contracts/fixtures/Baal/contracts";
import { Loot } from "../src/types/contracts/fixtures/Baal/contracts/LootERC20.sol";
import { Shares } from "../src/types/contracts/fixtures/Baal/contracts/SharesERC20.sol";

import { setShamanProposal, summonBaal } from '../src/baalUtils';

const domainName = "Passport";
const ISSUER = "0xd6fc34345bc8c8e5659a35bed9629d5558d48c4e";

import DIDKitSignedCredential from "../mocks/BrightIDSignedCredential.json";

import { normalizeDIDCredential } from "../utils/normalizeDIDCredential";

const SHAMAN_MGMT_LEVEL = 3;

type summonerArgs = {
  moloch: string; // Baal address
  vcVerifier: string; // VCVerifier address
  details: string;
  shares: boolean;
  amountPerCredential: BigNumber | string;
  tributeToken: string; // ERC20 token address | 0x
  minTribute: BigNumber | string; // BigNumber | string
}

const summonOnboarder = async function (
  onboarderArgs: summonerArgs,
  onboarderSummoner: VCOnboarderShamanSummoner,
) {
  let onboarderAddress;
  let summonOnboarderTx = await onboarderSummoner.summonOnboarder(
    onboarderArgs.moloch,
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

  describe("DIDStampVCVerifier", function () {
    let signer: SignerWithAddress;
    let submitter: SignerWithAddress;
    let didStampVCVerifier: DIDStampVcVerifier;

    beforeEach(async function () {
      const signers = await ethers.getSigners();
      signer = signers[0];
      submitter = signers[1];
    })

    it("should verify a didkit issued VC using the DIDStampVcVerifier smart contract", async function () {
      const stampVcVerifierFactory = <DIDStampVcVerifier__factory>await ethers.getContractFactory("DIDStampVcVerifier");
      didStampVCVerifier = <DIDStampVcVerifier>await stampVcVerifierFactory.connect(signer).deploy(domainName, ISSUER);

      await didStampVCVerifier.deployed();

      const { v, r, s } = ethers.utils.splitSignature(DIDKitSignedCredential.proof.proofValue);

      const normalizedDIDCredential = normalizeDIDCredential(DIDKitSignedCredential) as DocumentStruct;

      await expect(await didStampVCVerifier.connect(submitter).verifyStampVc(normalizedDIDCredential, v, r, s)).to.emit(
        didStampVCVerifier,
        "Verified",
      );
    });
  });

  describe("VCOnboarder", function () {
    let baal: Baal;
    let LootFactory: ContractFactory;
    let SharesFactory: ContractFactory;
    let ERC20: ContractFactory;
    let lootToken: Loot;
    let sharesToken: Shares;
    let multisend: MultiSend;

    let BaalFactory: ContractFactory;

    let applicant: SignerWithAddress;
    let summoner: SignerWithAddress;
    let s1: SignerWithAddress;
    let s2: SignerWithAddress;
    let s3: SignerWithAddress;
    let s4: SignerWithAddress;
    let s5: SignerWithAddress;
    let s6: SignerWithAddress;

    let token: MyToken;

    let didStampVCVerifier: DIDStampVcVerifier;

    let VCOnboarderFactory: ContractFactory;
    let onboarderSingleton: VCOnboarderShaman;
    let VCOnboarderSummonerFactory: ContractFactory;
    let onboarderSummoner: VCOnboarderShamanSummoner;

    const defaultDAOSettings = {
      GRACE_PERIOD_IN_SECONDS: 43200,
      VOTING_PERIOD_IN_SECONDS: 432000,
      PROPOSAL_OFFERING: 69,
      SPONSOR_THRESHOLD: 1,
      MIN_RETENTION_PERCENT: 0,
      MIN_STAKING_PERCENT: 0,
      QUORUM_PERCENT: 0,
      TOKEN_NAME: "BAALtests",
      TOKEN_SYMBOL: "BAAL",
    };

    this.beforeAll(async function () {
      LootFactory = await ethers.getContractFactory("Loot");
      SharesFactory = await ethers.getContractFactory("Shares");
      BaalFactory = await ethers.getContractFactory("Baal");

      VCOnboarderFactory = await ethers.getContractFactory("VCOnboarderShaman");
      onboarderSingleton = (await VCOnboarderFactory.deploy()) as VCOnboarderShaman;
      VCOnboarderSummonerFactory = await ethers.getContractFactory(
        "VCOnboarderShamanSummoner"
      );
      onboarderSummoner = (await VCOnboarderSummonerFactory.deploy(
        onboarderSingleton.address
      )) as VCOnboarderShamanSummoner;
    });
  
    beforeEach(async function () {
      [summoner, applicant, s1, s2, s3, s4, s5, s6] = await ethers.getSigners();

      ERC20 = await ethers.getContractFactory("MyToken");
      token = (await ERC20.deploy(
        ethers.utils.parseUnits("100.0", "ether")
      )) as MyToken;

      await token.transfer(applicant.address, ethers.utils.parseUnits("10.0", "ether"));
      await token.transfer(s2.address, ethers.utils.parseUnits("10.0", "ether"));

      const addresses = await summonBaal(
        defaultDAOSettings,
        { amount: 100, paused: false }, // lootConfig
        { amount: 100, paused: false } // sharesConfig
      );

      const MultisendContract = await ethers.getContractFactory("MultiSend");
      multisend = MultisendContract.attach(addresses.multisend) as MultiSend;
  
      baal = BaalFactory.attach(addresses.baal) as Baal;
  
      const lootTokenAddress = await baal.lootToken();
      lootToken = LootFactory.attach(lootTokenAddress) as Loot;
  
      const sharesTokenAddress = await baal.sharesToken();
      sharesToken = SharesFactory.attach(sharesTokenAddress) as Shares;

      const stampVcVerifierFactory = <DIDStampVcVerifier__factory>await ethers.getContractFactory("DIDStampVcVerifier");
      didStampVCVerifier = <DIDStampVcVerifier>await stampVcVerifierFactory.deploy(domainName, ISSUER);
    });

    it("mint shares on sending eth", async function () {
      const onboarderArgs: summonerArgs = {
        moloch: baal.address,
        vcVerifier: didStampVCVerifier.address,
        details: "TestShaman",
        shares: true,
        amountPerCredential: ethers.utils.parseUnits("1.0", "ether"),
        tributeToken: ethers.constants.AddressZero,
        minTribute: "0",
      };

      let onboarderAddress = await summonOnboarder(
        onboarderArgs,
        onboarderSummoner,
      );
      const id = await setShamanProposal(baal, multisend, onboarderAddress, SHAMAN_MGMT_LEVEL);

      const baalTotalSupplyBefore = await baal.totalSupply();
      const sharesBefore = await sharesToken.balanceOf(summoner.address);

      const onboaderShaman = VCOnboarderFactory.attach(onboarderAddress) as VCOnboarderShaman;

      const { v, r, s } = ethers.utils.splitSignature(DIDKitSignedCredential.proof.proofValue);

      const normalizedDIDCredential = normalizeDIDCredential(DIDKitSignedCredential) as DocumentStruct;

      const onboardTx = await onboaderShaman.connect(summoner).functions.onboarder(
        normalizedDIDCredential,
        v, r, s,
        { value: onboarderArgs.minTribute },
      );

      await onboardTx.wait();

      const sharesAfter = await sharesToken.balanceOf(summoner.address);
      const baalTotalSupplyAfter = await baal.totalSupply();

      expect(sharesAfter).to.equal(sharesBefore.add(onboarderArgs.amountPerCredential));
      expect(baalTotalSupplyAfter).to.equal(baalTotalSupplyBefore.add(onboarderArgs.amountPerCredential));
    });

    it("cant mint shares on sending tokens instead of eth", async function () {
      const onboarderArgs: summonerArgs = {
        moloch: baal.address,
        vcVerifier: didStampVCVerifier.address,
        details: "TestShaman",
        shares: true,
        amountPerCredential: ethers.utils.parseUnits("1.0", "ether"),
        tributeToken: ethers.constants.AddressZero,
        minTribute: ethers.utils.parseUnits("1.0", "ether"),
      };

      let onboarderAddress = await summonOnboarder(
        onboarderArgs,
        onboarderSummoner,
      );
      const id = await setShamanProposal(baal, multisend, onboarderAddress, SHAMAN_MGMT_LEVEL);

      const onboaderShaman = VCOnboarderFactory.attach(onboarderAddress) as VCOnboarderShaman;

      const { v, r, s } = ethers.utils.splitSignature(DIDKitSignedCredential.proof.proofValue);

      const normalizedDIDCredential = normalizeDIDCredential(DIDKitSignedCredential) as DocumentStruct;

      const onboardTx = onboaderShaman.connect(summoner).functions.onboarder20(
        normalizedDIDCredential,
        v, r, s,
        onboarderArgs.minTribute,
      );

      expect(onboardTx).to.revertedWith("!token");
    });

    it("mint loot on sending eth", async function () {
      const onboarderArgs: summonerArgs = {
        moloch: baal.address,
        vcVerifier: didStampVCVerifier.address,
        details: "TestShaman",
        shares: false,
        amountPerCredential: ethers.utils.parseUnits("1.0", "ether"),
        tributeToken: ethers.constants.AddressZero,
        minTribute: "0",
      };

      let onboarderAddress = await summonOnboarder(
        onboarderArgs,
        onboarderSummoner,
      );
      const id = await setShamanProposal(baal, multisend, onboarderAddress, SHAMAN_MGMT_LEVEL);

      const baalTotalSupplyBefore = await baal.totalSupply();
      const sharesBefore = await lootToken.balanceOf(summoner.address);

      const onboaderShaman = VCOnboarderFactory.attach(onboarderAddress) as VCOnboarderShaman;

      const { v, r, s } = ethers.utils.splitSignature(DIDKitSignedCredential.proof.proofValue);

      const normalizedDIDCredential = normalizeDIDCredential(DIDKitSignedCredential) as DocumentStruct;

      const onboardTx = await onboaderShaman.connect(summoner).functions.onboarder(
        normalizedDIDCredential,
        v, r, s,
        { value: onboarderArgs.minTribute },
      );

      await onboardTx.wait();

      const sharesAfter = await lootToken.balanceOf(summoner.address);
      const baalTotalSupplyAfter = await baal.totalSupply();

      expect(sharesAfter).to.equal(sharesBefore.add(onboarderArgs.amountPerCredential));
      expect(baalTotalSupplyAfter).to.equal(baalTotalSupplyBefore.add(onboarderArgs.amountPerCredential));
    });

    it("mint shares on sending token", async function () {
      const onboarderArgs: summonerArgs = {
        moloch: baal.address,
        vcVerifier: didStampVCVerifier.address,
        details: "TestShaman",
        shares: true,
        amountPerCredential: ethers.utils.parseUnits("1.0", "ether"),
        tributeToken: token.address,
        minTribute: ethers.utils.parseUnits("1.0", "ether"),
      };

      let onboarderAddress = await summonOnboarder(
        onboarderArgs,
        onboarderSummoner,
      );
      const id = await setShamanProposal(baal, multisend, onboarderAddress, SHAMAN_MGMT_LEVEL);

      const balanceBefore = await token.balanceOf(summoner.address);
      const baalTotalSupplyBefore = await baal.totalSupply();
      const sharesBefore = await sharesToken.balanceOf(summoner.address);

      const onboaderShaman = VCOnboarderFactory.attach(onboarderAddress) as VCOnboarderShaman;

      const approveTx = await token.approve(onboaderShaman.address, onboarderArgs.minTribute);
      await approveTx.wait();

      const { v, r, s } = ethers.utils.splitSignature(DIDKitSignedCredential.proof.proofValue);

      const normalizedDIDCredential = normalizeDIDCredential(DIDKitSignedCredential) as DocumentStruct;

      const onboardTx = await onboaderShaman.connect(summoner).functions.onboarder20(
        normalizedDIDCredential,
        v, r, s,
        onboarderArgs.minTribute,
      );

      await onboardTx.wait();

      const balanceAfter = await token.balanceOf(summoner.address);
      const sharesAfter = await sharesToken.balanceOf(summoner.address);
      const baalTotalSupplyAfter = await baal.totalSupply();

      expect(balanceAfter).to.equal(balanceBefore.sub(onboarderArgs.minTribute));
      expect(sharesAfter).to.equal(sharesBefore.add(onboarderArgs.amountPerCredential));
      expect(baalTotalSupplyAfter).to.equal(baalTotalSupplyBefore.add(onboarderArgs.amountPerCredential));
    });

    it("cant mint shares on sending eth instead of tokens", async function () {
      const onboarderArgs: summonerArgs = {
        moloch: baal.address,
        vcVerifier: didStampVCVerifier.address,
        details: "TestShaman",
        shares: true,
        amountPerCredential: ethers.utils.parseUnits("1.0", "ether"),
        tributeToken: token.address,
        minTribute: ethers.utils.parseUnits("1.0", "ether"),
      };

      let onboarderAddress = await summonOnboarder(
        onboarderArgs,
        onboarderSummoner,
      );
      const id = await setShamanProposal(baal, multisend, onboarderAddress, SHAMAN_MGMT_LEVEL);

      const onboaderShaman = VCOnboarderFactory.attach(onboarderAddress) as VCOnboarderShaman;

      const { v, r, s } = ethers.utils.splitSignature(DIDKitSignedCredential.proof.proofValue);

      const normalizedDIDCredential = normalizeDIDCredential(DIDKitSignedCredential) as DocumentStruct;

      const onboardTx = onboaderShaman.connect(summoner).functions.onboarder(
        normalizedDIDCredential,
        v, r, s,
        { value: onboarderArgs.minTribute },
      );

      expect(onboardTx).to.revertedWith("!native");
    });

    it("mint loot on sending token", async function () {
      const onboarderArgs: summonerArgs = {
        moloch: baal.address,
        vcVerifier: didStampVCVerifier.address,
        details: "TestShaman",
        shares: false,
        amountPerCredential: ethers.utils.parseUnits("1.0", "ether"),
        tributeToken: token.address,
        minTribute: ethers.utils.parseUnits("1.0", "ether"),
      };

      let onboarderAddress = await summonOnboarder(
        onboarderArgs,
        onboarderSummoner,
      );
      const id = await setShamanProposal(baal, multisend, onboarderAddress, SHAMAN_MGMT_LEVEL);

      const balanceBefore = await token.balanceOf(summoner.address);
      const baalTotalSupplyBefore = await baal.totalSupply();
      const sharesBefore = await lootToken.balanceOf(summoner.address);

      const onboaderShaman = VCOnboarderFactory.attach(onboarderAddress) as VCOnboarderShaman;

      const approveTx = await token.approve(onboaderShaman.address, onboarderArgs.minTribute);
      await approveTx.wait();

      const { v, r, s } = ethers.utils.splitSignature(DIDKitSignedCredential.proof.proofValue);

      const normalizedDIDCredential = normalizeDIDCredential(DIDKitSignedCredential) as DocumentStruct;

      const onboardTx = await onboaderShaman.connect(summoner).functions.onboarder20(
        normalizedDIDCredential,
        v, r, s,
        onboarderArgs.minTribute,
      );

      await onboardTx.wait();

      const balanceAfter = await token.balanceOf(summoner.address);
      const sharesAfter = await lootToken.balanceOf(summoner.address);
      const baalTotalSupplyAfter = await baal.totalSupply();

      expect(balanceAfter).to.equal(balanceBefore.sub(onboarderArgs.minTribute));
      expect(sharesAfter).to.equal(sharesBefore.add(onboarderArgs.amountPerCredential));
      expect(baalTotalSupplyAfter).to.equal(baalTotalSupplyBefore.add(onboarderArgs.amountPerCredential));
    });

    it("cant mint more shares if credential was already vouched", async function () {
      const onboarderArgs: summonerArgs = {
        moloch: baal.address,
        vcVerifier: didStampVCVerifier.address,
        details: "TestShaman",
        shares: true,
        amountPerCredential: ethers.utils.parseUnits("1.0", "ether"),
        tributeToken: token.address,
        minTribute: ethers.utils.parseUnits("1.0", "ether"),
      };

      let onboarderAddress = await summonOnboarder(
        onboarderArgs,
        onboarderSummoner,
      );

      const id = await setShamanProposal(baal, multisend, onboarderAddress, SHAMAN_MGMT_LEVEL);

      const balanceBefore = await token.balanceOf(summoner.address);
      const baalTotalSupplyBefore = await baal.totalSupply();
      const sharesBefore = await sharesToken.balanceOf(summoner.address);

      const onboaderShaman = VCOnboarderFactory.attach(onboarderAddress) as VCOnboarderShaman;

      const approveTx = await token.approve(onboaderShaman.address, onboarderArgs.minTribute);
      await approveTx.wait();

      const { v, r, s } = ethers.utils.splitSignature(DIDKitSignedCredential.proof.proofValue);

      const normalizedDIDCredential = normalizeDIDCredential(DIDKitSignedCredential) as DocumentStruct;

      const onboardTx = await onboaderShaman.connect(summoner).functions.onboarder20(
        normalizedDIDCredential,
        v, r, s,
        onboarderArgs.minTribute,
      );

      await onboardTx.wait();

      const balanceAfter = await token.balanceOf(summoner.address);
      const sharesAfter = await sharesToken.balanceOf(summoner.address);
      const baalTotalSupplyAfter = await baal.totalSupply();

      expect(balanceAfter).to.equal(balanceBefore.sub(onboarderArgs.minTribute));
      expect(sharesAfter).to.equal(sharesBefore.add(onboarderArgs.amountPerCredential));
      expect(baalTotalSupplyAfter).to.equal(baalTotalSupplyBefore.add(onboarderArgs.amountPerCredential));

      const moreSharesTx = onboaderShaman.connect(summoner).functions.onboarder20(
        normalizedDIDCredential,
        v, r, s,
        onboarderArgs.minTribute,
      );
      expect(moreSharesTx).to.revertedWith("AlreadyVouchedCredential");
    });
  });
})
