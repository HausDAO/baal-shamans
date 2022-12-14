/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export interface SubscriptionShamanSummonerInterface extends utils.Interface {
  functions: {
    "summonSubscription(address,address,uint256,uint256,uint256,uint256,bool,address[],uint256[])": FunctionFragment;
    "template()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "summonSubscription" | "template"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "summonSubscription",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>,
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>[]
    ]
  ): string;
  encodeFunctionData(functionFragment: "template", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "summonSubscription",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "template", data: BytesLike): Result;

  events: {
    "SummonComplete(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "SummonComplete"): EventFragment;
}

export interface SummonCompleteEventObject {
  baal: string;
  onboarder: string;
}
export type SummonCompleteEvent = TypedEvent<
  [string, string],
  SummonCompleteEventObject
>;

export type SummonCompleteEventFilter = TypedEventFilter<SummonCompleteEvent>;

export interface SubscriptionShamanSummoner extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SubscriptionShamanSummonerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    summonSubscription(
      _moloch: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _priceActivation: PromiseOrValue<BigNumberish>,
      _pricePer: PromiseOrValue<BigNumberish>,
      _lootPerUnit: PromiseOrValue<BigNumberish>,
      _periodLength: PromiseOrValue<BigNumberish>,
      _shares: PromiseOrValue<boolean>,
      _cuts: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    template(overrides?: CallOverrides): Promise<[string]>;
  };

  summonSubscription(
    _moloch: PromiseOrValue<string>,
    _token: PromiseOrValue<string>,
    _priceActivation: PromiseOrValue<BigNumberish>,
    _pricePer: PromiseOrValue<BigNumberish>,
    _lootPerUnit: PromiseOrValue<BigNumberish>,
    _periodLength: PromiseOrValue<BigNumberish>,
    _shares: PromiseOrValue<boolean>,
    _cuts: PromiseOrValue<string>[],
    _amounts: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  template(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    summonSubscription(
      _moloch: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _priceActivation: PromiseOrValue<BigNumberish>,
      _pricePer: PromiseOrValue<BigNumberish>,
      _lootPerUnit: PromiseOrValue<BigNumberish>,
      _periodLength: PromiseOrValue<BigNumberish>,
      _shares: PromiseOrValue<boolean>,
      _cuts: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<string>;

    template(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "SummonComplete(address,address)"(
      baal?: PromiseOrValue<string> | null,
      onboarder?: null
    ): SummonCompleteEventFilter;
    SummonComplete(
      baal?: PromiseOrValue<string> | null,
      onboarder?: null
    ): SummonCompleteEventFilter;
  };

  estimateGas: {
    summonSubscription(
      _moloch: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _priceActivation: PromiseOrValue<BigNumberish>,
      _pricePer: PromiseOrValue<BigNumberish>,
      _lootPerUnit: PromiseOrValue<BigNumberish>,
      _periodLength: PromiseOrValue<BigNumberish>,
      _shares: PromiseOrValue<boolean>,
      _cuts: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    template(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    summonSubscription(
      _moloch: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _priceActivation: PromiseOrValue<BigNumberish>,
      _pricePer: PromiseOrValue<BigNumberish>,
      _lootPerUnit: PromiseOrValue<BigNumberish>,
      _periodLength: PromiseOrValue<BigNumberish>,
      _shares: PromiseOrValue<boolean>,
      _cuts: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    template(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
