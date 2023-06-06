/*
  in order to adjust the build folder:
    1) import any files here you want in the build.
    2) copy the file path of the import.
    3) add the path to the ts.config.build.json under the { include: [...] } configuration.
    4) bump package.json version to publish a new package to npm.
*/
import { EthOnboarderShaman } from './types/contracts/onboarder/EthOnboarder.sol/EthOnboarderShaman';
import { EthOnboarderShaman__factory as EthOnboarderShamanFactory } from './types/factories/contracts/onboarder/EthOnboarder.sol/EthOnboarderShaman__factory';
import { EthOnboarderShamanSummoner } from './types/contracts/onboarder/EthOnboarder.sol/EthOnboarderShamanSummoner';
import { EthOnboarderShamanSummoner__factory as EthOnboarderShamanSummonerFactory } from './types/factories/contracts/onboarder/EthOnboarder.sol/EthOnboarderShamanSummoner__factory';
import { OnboarderShaman } from './types/contracts/onboarder/Onboarder.sol/OnboarderShaman';
import { OnboarderShaman__factory as OnboarderShamanFactory } from './types/factories/contracts/onboarder/Onboarder.sol/OnboarderShaman__factory';
import { OnboarderShamanSummoner } from './types/contracts/onboarder/Onboarder.sol/OnboarderShamanSummoner';
import { OnboarderShamanSummoner__factory as OnboarderShamanSummonerFactory } from './types/factories/contracts/onboarder/Onboarder.sol/OnboarderShamanSummoner__factory';
import { SimpleOnboarderShaman } from './types/contracts/onboarder/SimpleOnboarder.sol/SimpleOnboarderShaman';
import { SimpleOnboarderShaman__factory as SimpleOnboarderShamanFactory } from './types/factories/contracts/onboarder/SimpleOnboarder.sol/SimpleOnboarderShaman__factory';
import { SimpleOnboarderShamanSummoner } from './types/contracts/onboarder/SimpleOnboarder.sol/SimpleOnboarderShamanSummoner';
import { SimpleOnboarderShamanSummoner__factory as SimpleOnboarderShamanSummonerFactory } from './types/factories/contracts/onboarder/SimpleOnboarder.sol/SimpleOnboarderShamanSummoner__factory';
import { MultiplyOnboarderShaman } from './types/contracts/onboarder/MultiplyOnboarder.sol/MultiplyOnboarderShaman';
import { MultiplyOnboarderShaman__factory as MultiplyOnboarderShamanFactory } from './types/factories/contracts/onboarder/MultiplyOnboarder.sol/MultiplyOnboarderShaman__factory';
import { MultiplyOnboarderShamanSummoner } from './types/contracts/onboarder/MultiplyOnboarder.sol/MultiplyOnboarderShamanSummoner';
import { MultiplyOnboarderShamanSummoner__factory as MultiplyOnboarderShamanSummonerFactory } from './types/factories/contracts/onboarder/MultiplyOnboarder.sol/MultiplyOnboarderShamanSummoner__factory';
import { VCOnboarderShaman } from './types/contracts/onboarder/VCOnboarder.sol/VCOnboarderShaman';
import { VCOnboarderShaman__factory as VCOnboarderShamanFactory } from './types/factories/contracts/onboarder/VCOnboarder.sol/VCOnboarderShaman__factory';
import { VCOnboarderShamanSummoner } from './types/contracts/onboarder/VCOnboarder.sol/VCOnboarderShamanSummoner';
import { VCOnboarderShamanSummoner__factory as VCOnboarderShamanSummonerFactory } from './types/factories/contracts/onboarder/VCOnboarder.sol/VCOnboarderShamanSummoner__factory';
import { NFTClaimerShaman } from './types/contracts/onboarder/ERC721/NFTClaimer.sol/NFTClaimerShaman';
import { NFTClaimerShaman__factory as NFTClaimerShamanFactory } from './types/factories/contracts/onboarder/ERC721/NFTClaimer.sol/NFTClaimerShaman__factory';
import { NFTClaimerShamanSummoner  } from './types/contracts/onboarder/ERC721/NFTClaimer.sol/NFTClaimerShamanSummoner';
import { NFTClaimerShamanSummoner__factory as NFTClaimerShamanSummonerFactory } from './types/factories/contracts/onboarder/ERC721/NFTClaimer.sol/NFTClaimerShamanSummoner__factory';
import { SubscriptionShaman } from './types/contracts/subscriptions/Subscriptions.sol/SubscriptionShaman';
import { SubscriptionShaman__factory as SubscriptionShamanFactory } from './types/factories/contracts/subscriptions/Subscriptions.sol/SubscriptionShaman__factory';
import { SubscriptionShamanSummoner } from './types/contracts/subscriptions/Subscriptions.sol/SubscriptionShamanSummoner';
import { SubscriptionShamanSummoner__factory as SubscriptionShamanSummonerFactory } from './types/factories/contracts/subscriptions/Subscriptions.sol/SubscriptionShamanSummoner__factory';
import { CheckInShaman } from './types/contracts/checkIn/CheckIn.sol/CheckInShaman';
import { CheckInSummoner } from './types/contracts/checkIn/CheckIn.sol/CheckInSummoner';
import { CheckInShaman__factory as CheckinShamanFactory } from './types/factories/contracts/checkIn/CheckIn.sol/CheckInShaman__factory';
import { CheckInSummoner__factory as CheckInSummonerFactory } from './types/factories/contracts/checkIn/CheckIn.sol/CheckInSummoner__factory';
import { CheckInShamanV2 } from './types/contracts/checkIn/CheckInV2.sol/CheckInShamanV2';
import { CheckInV2Summoner } from './types/contracts/checkIn/CheckInV2.sol/CheckInV2Summoner';
import { CheckInShamanV2__factory as CheckInShamanV2Factory } from './types/factories/contracts/checkIn/CheckInV2.sol/CheckInShamanV2__factory';
import { CheckInV2Summoner__factory as CheckInV2SummonerFactory } from './types/factories/contracts/checkIn/CheckInV2.sol/CheckInV2Summoner__factory';

export { 
  EthOnboarderShaman,
  EthOnboarderShamanFactory,
  EthOnboarderShamanSummoner,
  EthOnboarderShamanSummonerFactory,
  OnboarderShaman,
  OnboarderShamanFactory,
  OnboarderShamanSummoner,
  OnboarderShamanSummonerFactory,
  SimpleOnboarderShaman,
  SimpleOnboarderShamanFactory,
  SimpleOnboarderShamanSummoner,
  SimpleOnboarderShamanSummonerFactory,
  MultiplyOnboarderShaman,
  MultiplyOnboarderShamanFactory,
  MultiplyOnboarderShamanSummoner,
  MultiplyOnboarderShamanSummonerFactory,
  SubscriptionShaman,
  SubscriptionShamanFactory,
  SubscriptionShamanSummoner,
  SubscriptionShamanSummonerFactory,
  VCOnboarderShaman,
  VCOnboarderShamanFactory,
  VCOnboarderShamanSummoner,
  VCOnboarderShamanSummonerFactory,
  NFTClaimerShaman,
  NFTClaimerShamanFactory,
  NFTClaimerShamanSummoner,
  NFTClaimerShamanSummonerFactory,
  CheckInShaman,
  CheckinShamanFactory,
  CheckInSummoner,
  CheckInSummonerFactory,
  CheckInShamanV2,
  CheckInV2Summoner,
  CheckInShamanV2Factory,
  CheckInV2SummonerFactory
};
