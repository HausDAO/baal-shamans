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
} from "../../common";

export interface OnboarderShamanSummonerInterface extends utils.Interface {
  functions: {
    "summonOnboarder(address,address,uint256,string,bool,uint256,uint256)": FunctionFragment;
    "template()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "summonOnboarder" | "template"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "summonOnboarder",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<boolean>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: "template", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "summonOnboarder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "template", data: BytesLike): Result;

  events: {
    "SummonOnbShamanoarderComplete(address,address,address,uint256,string,bool)": EventFragment;
  };

  getEvent(
    nameOrSignatureOrTopic: "SummonOnbShamanoarderComplete"
  ): EventFragment;
}

export interface SummonOnbShamanoarderCompleteEventObject {
  baal: string;
  onboarder: string;
  wrapper: string;
  pricePerUnit: BigNumber;
  details: string;
  _onlyERC20: boolean;
}
export type SummonOnbShamanoarderCompleteEvent = TypedEvent<
  [string, string, string, BigNumber, string, boolean],
  SummonOnbShamanoarderCompleteEventObject
>;

export type SummonOnbShamanoarderCompleteEventFilter =
  TypedEventFilter<SummonOnbShamanoarderCompleteEvent>;

export interface OnboarderShamanSummoner extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: OnboarderShamanSummonerInterface;

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
    summonOnboarder(
      _baal: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _pricePerUnit: PromiseOrValue<BigNumberish>,
      _details: PromiseOrValue<string>,
      _onlyERC20: PromiseOrValue<boolean>,
      _platformFee: PromiseOrValue<BigNumberish>,
      _lootPerUnit: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    template(overrides?: CallOverrides): Promise<[string]>;
  };

  summonOnboarder(
    _baal: PromiseOrValue<string>,
    _token: PromiseOrValue<string>,
    _pricePerUnit: PromiseOrValue<BigNumberish>,
    _details: PromiseOrValue<string>,
    _onlyERC20: PromiseOrValue<boolean>,
    _platformFee: PromiseOrValue<BigNumberish>,
    _lootPerUnit: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  template(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    summonOnboarder(
      _baal: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _pricePerUnit: PromiseOrValue<BigNumberish>,
      _details: PromiseOrValue<string>,
      _onlyERC20: PromiseOrValue<boolean>,
      _platformFee: PromiseOrValue<BigNumberish>,
      _lootPerUnit: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    template(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "SummonOnbShamanoarderComplete(address,address,address,uint256,string,bool)"(
      baal?: PromiseOrValue<string> | null,
      onboarder?: null,
      wrapper?: null,
      pricePerUnit?: null,
      details?: null,
      _onlyERC20?: null
    ): SummonOnbShamanoarderCompleteEventFilter;
    SummonOnbShamanoarderComplete(
      baal?: PromiseOrValue<string> | null,
      onboarder?: null,
      wrapper?: null,
      pricePerUnit?: null,
      details?: null,
      _onlyERC20?: null
    ): SummonOnbShamanoarderCompleteEventFilter;
  };

  estimateGas: {
    summonOnboarder(
      _baal: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _pricePerUnit: PromiseOrValue<BigNumberish>,
      _details: PromiseOrValue<string>,
      _onlyERC20: PromiseOrValue<boolean>,
      _platformFee: PromiseOrValue<BigNumberish>,
      _lootPerUnit: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    template(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    summonOnboarder(
      _baal: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _pricePerUnit: PromiseOrValue<BigNumberish>,
      _details: PromiseOrValue<string>,
      _onlyERC20: PromiseOrValue<boolean>,
      _platformFee: PromiseOrValue<BigNumberish>,
      _lootPerUnit: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    template(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
