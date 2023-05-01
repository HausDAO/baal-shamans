/*
  in order to adjust the build folder:
    1) import any files here you want in the build.
    2) copy the file path of the import.
    3) add the path to the ts.config.build.json under the { include: [...] } configuration.
    4) bump package.json version to publish a new package to npm.
*/
import { OnboarderShaman } from './types/contracts/onboarder/Onboarder.sol/OnboarderShaman';
import { OnboarderShaman__factory as OnboarderShamanFactory } from './types/factories/contracts/onboarder/Onboarder.sol/OnboarderShaman__factory';
import { OnboarderShamanSummoner } from './types/contracts/onboarder/Onboarder.sol/OnboarderShamanSummoner';
import { OnboarderShamanSummoner__factory as OnboarderShamanSummonerFactory } from './types/factories/contracts/onboarder/Onboarder.sol/OnboarderShamanSummoner__factory';
import { VCOnboarderShaman } from './types/contracts/onboarder/VCOnboarder.sol/VCOnboarderShaman';
import { VCOnboarderShaman__factory as VCOnboarderShamanFactory } from './types/factories/contracts/onboarder/VCOnboarder.sol/VCOnboarderShaman__factory';
import { VCOnboarderShamanSummoner } from './types/contracts/onboarder/VCOnboarder.sol/VCOnboarderShamanSummoner';
import { VCOnboarderShamanSummoner__factory as VCOnboarderShamanSummonerFactory } from './types/factories/contracts/onboarder/VCOnboarder.sol/VCOnboarderShamanSummoner__factory';
import { SimpleOnboarderShaman } from './types/contracts/simpleOnboarder/SimpleOnboarder.sol/SimpleOnboarderShaman';
import { SimpleOnboarderShaman__factory as SimpleOnboarderShamanFactory } from './types/factories/contracts/simpleOnboarder/SimpleOnboarder.sol/SimpleOnboarderShaman__factory';
import { SimpleOnboarderShamanSummoner } from './types/contracts/simpleOnboarder/SimpleOnboarder.sol/SimpleOnboarderShamanSummoner';
import { SimpleOnboarderShamanSummoner__factory as SimpleOnboarderShamanSummonerFactory } from './types/factories/contracts/simpleOnboarder/SimpleOnboarder.sol/SimpleOnboarderShamanSummoner__factory';
import { SubscriptionShaman } from './types/contracts/subscriptions/Subscriptions.sol/SubscriptionShaman';
import { SubscriptionShaman__factory as SubscriptionShamanFactory } from './types/factories/contracts/subscriptions/Subscriptions.sol/SubscriptionShaman__factory';
import { SubscriptionShamanSummoner } from './types/contracts/subscriptions/Subscriptions.sol/SubscriptionShamanSummoner';
import { SubscriptionShamanSummoner__factory as SubscriptionShamanSummonerFactory } from './types/factories/contracts/subscriptions/Subscriptions.sol/SubscriptionShamanSummoner__factory';


import { IBAAL } from './types/contracts/interfaces/IBAAL';

export { 
    OnboarderShaman,
    OnboarderShamanFactory,
    OnboarderShamanSummoner,
    OnboarderShamanSummonerFactory,
    SimpleOnboarderShaman,
    SimpleOnboarderShamanFactory,
    SimpleOnboarderShamanSummoner,
    SimpleOnboarderShamanSummonerFactory,
    SubscriptionShaman,
    SubscriptionShamanFactory,
    SubscriptionShamanSummoner,
    SubscriptionShamanSummonerFactory,
    VCOnboarderShaman,
    VCOnboarderShamanFactory,
    VCOnboarderShamanSummoner,
    VCOnboarderShamanSummonerFactory,
    IBAAL,
};
