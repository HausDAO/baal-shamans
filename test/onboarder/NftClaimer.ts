import { expect } from 'chai';
import { deployments, ethers, getNamedAccounts, getUnnamedAccounts } from 'hardhat';
import { Baal, Loot, NewBaalParams, ProposalHelpers, Shares, setupBaal } from '@daohaus/baal-contracts';
import { baalSetup, SHAMAN_PERMISSIONS, Signer } from '@daohaus/baal-contracts';
import { BigNumberish } from '@ethersproject/bignumber';

import { MultiSend, MyNft, NFTClaimerShaman } from '../../src/types';
import { NFTClaimerShamanSummoner } from '../../src/types/contracts/onboarder/ERC721/NFTClaimer.sol';

type NFTClaimerArgs = {
  nftAddress: string;
  isShares: boolean;
  perNft: BigNumberish;
};

const summonNftClaimer = async function (
  baal: Baal,
  nftClaimerShamanSummoner: NFTClaimerShamanSummoner,
  nftClaimerArgs: NFTClaimerArgs
) {
  let nftClaimerAddress;
  let summonNftClaimerTx = await nftClaimerShamanSummoner.summonNFTClaimer(
    baal.address,
    nftClaimerArgs.nftAddress,
    nftClaimerArgs.isShares,
    nftClaimerArgs.perNft
  );

  let result = await summonNftClaimerTx.wait();
  if (
    result &&
    result.events &&
    result.events[1] &&
    result.events[1].args &&
    result.events[1].args.claimer
  ) {
    nftClaimerAddress = result.events[1].args.claimer;
  }

  return nftClaimerAddress;
};

describe('NFTClaimerShaman', function () {
  let baal: Baal;
  let lootToken: Loot;
  let sharesToken: Shares;
  let multisend: MultiSend;

  let nftToken: MyNft;

  let nftClaimerSummoner: NFTClaimerShamanSummoner;

  let users: {
    [key: string]: Signer;
  };

  const yes = true;
  const no = false;

  const defaultNFTClaimerArgs = {
    nftAddress: ethers.constants.AddressZero,
    isShares: true,
    perNft: ethers.utils.parseUnits('1.0', 'ether'),
  };

  const shamanPermissions = SHAMAN_PERMISSIONS.ADMIN_MANAGER; // 3

  let proposalHelpers: ProposalHelpers;

  beforeEach(async function () {
    const {
      Baal,
      Loot,
      Shares,
      MultiSend,
      signers,
      helpers,
    } = await baalSetup({
      fixtureTags: ['NFTClaimer'],
      setupBaalOverride: async (params: NewBaalParams) => {
        console.log('OVERRIDE baal setup ******');
        const { deployer } = await getNamedAccounts();
        const [summoner, applicant] = await getUnnamedAccounts();
        nftClaimerSummoner =
          (await ethers.getContract('NFTClaimerShamanSummoner', deployer)) as NFTClaimerShamanSummoner;
        
        await deployments.deploy('MyNft', {
          contract: 'MyNft',
          from: deployer,
          args: ['12345'],
          log: true,
        });
        nftToken = (await ethers.getContract('MyNft', deployer)) as MyNft;
        await nftToken.mint(summoner, '23456');
        await nftToken.mint(applicant, '34567');

        return setupBaal(params);
      },
    });

    baal = Baal;
    lootToken = Loot;
    sharesToken = Shares;
    multisend = MultiSend;
    users = signers;

    proposalHelpers = helpers;
    
    // const onboarderSetup = deployments.createFixture<NFTClaimerSetup, any>(
    //   async (hre: HardhatRuntimeEnvironment, options?: any
    // ) => {
    //     const { getNamedAccounts } = hre;
    //     const { deployer } = await getNamedAccounts();
    //     await deployments.fixture(['NFTClaimer']);
    //     const summoner =
    //       (await ethers.getContract('NFTClaimerShamanSummoner', deployer)) as NFTClaimerShamanSummoner;
        
    //     await deployments.deploy('MyNft', {
    //       contract: 'MyNft',
    //       from: deployer,
    //       args: ['12345'],
    //       log: true,
    //     });
    //     const nft = (await ethers.getContract('MyNft', deployer)) as MyNft;
    //     await nft.mint(users.summoner.address, '23456');
    //     await nft.mint(users.applicant.address, '34567');

    //     return {
    //       nft: nft,
    //       nftClaimerSummoner: summoner,
    //     };
    // });
    // const setup = await onboarderSetup();
    // nftToken = setup.nft;
    // nftClaimerSummoner = setup.nftClaimerSummoner;
  });

  describe('nftClaim', function () {
    it('mint shares on claim', async () => {
      const nftClaimerArgs = {
        ...defaultNFTClaimerArgs,
        nftAddress: nftToken.address,
      };

      const nftClaimerAddress = await summonNftClaimer(
        baal,
        nftClaimerSummoner,
        nftClaimerArgs
      );
  
      users.summoner.baal &&
        await proposalHelpers.setShamanProposal(baal, multisend, nftClaimerAddress, shamanPermissions);

      const memberBalance = await sharesToken.balanceOf(users.summoner.address);
      const memberTokenId = '23456';

      const nftOnboarder = (
          await ethers.getContractAt(
          'NFTClaimerShaman',
          nftClaimerAddress,
          users.summoner.address
        )
      ) as NFTClaimerShaman;

      expect(await nftToken.ownerOf(memberTokenId)).to.equal(users.summoner.address);

      await nftOnboarder.claim(memberTokenId);

      const memberNewBalance = await sharesToken.balanceOf(users.summoner.address);
      const perNft = await nftOnboarder.perNft();

      expect(memberNewBalance).to.equal(memberBalance.add(perNft));
    });
  });
});
