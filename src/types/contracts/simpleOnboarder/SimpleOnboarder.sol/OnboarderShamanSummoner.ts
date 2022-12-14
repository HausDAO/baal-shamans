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

export interface OnboarderShamanSummonerInterface extends utils.Interface {
  functions: {
    "summonOnboarder(address,address,uint256,uint256,bool,address[],uint256[],string)": FunctionFragment;
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
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>,
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(functionFragment: "template", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "summonOnboarder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "template", data: BytesLike): Result;

  events: {
    "SummonOnbShamanoarderComplete(address,address,address,uint256,uint256,string,bool,address[],uint256[])": EventFragment;
  };

  getEvent(
    nameOrSignatureOrTopic: "SummonOnbShamanoarderComplete"
  ): EventFragment;
}

export interface SummonOnbShamanoarderCompleteEventObject {
  baal: string;
  onboarder: string;
  token: string;
  price: BigNumber;
  expiery: BigNumber;
  details: string;
  _shares: boolean;
  _cuts: string[];
  _amounts: BigNumber[];
}
export type SummonOnbShamanoarderCompleteEvent = TypedEvent<
  [
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    string,
    boolean,
    string[],
    BigNumber[]
  ],
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
      _moloch: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _price: PromiseOrValue<BigNumberish>,
      _expiery: PromiseOrValue<BigNumberish>,
      _shares: PromiseOrValue<boolean>,
      _cuts: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      _details: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    template(overrides?: CallOverrides): Promise<[string]>;
  };

  summonOnboarder(
    _moloch: PromiseOrValue<string>,
    _token: PromiseOrValue<string>,
    _price: PromiseOrValue<BigNumberish>,
    _expiery: PromiseOrValue<BigNumberish>,
    _shares: PromiseOrValue<boolean>,
    _cuts: PromiseOrValue<string>[],
    _amounts: PromiseOrValue<BigNumberish>[],
    _details: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  template(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    summonOnboarder(
      _moloch: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _price: PromiseOrValue<BigNumberish>,
      _expiery: PromiseOrValue<BigNumberish>,
      _shares: PromiseOrValue<boolean>,
      _cuts: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      _details: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    template(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "SummonOnbShamanoarderComplete(address,address,address,uint256,uint256,string,bool,address[],uint256[])"(
      baal?: PromiseOrValue<string> | null,
      onboarder?: null,
      token?: null,
      price?: null,
      expiery?: null,
      details?: null,
      _shares?: null,
      _cuts?: null,
      _amounts?: null
    ): SummonOnbShamanoarderCompleteEventFilter;
    SummonOnbShamanoarderComplete(
      baal?: PromiseOrValue<string> | null,
      onboarder?: null,
      token?: null,
      price?: null,
      expiery?: null,
      details?: null,
      _shares?: null,
      _cuts?: null,
      _amounts?: null
    ): SummonOnbShamanoarderCompleteEventFilter;
  };

  estimateGas: {
    summonOnboarder(
      _moloch: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _price: PromiseOrValue<BigNumberish>,
      _expiery: PromiseOrValue<BigNumberish>,
      _shares: PromiseOrValue<boolean>,
      _cuts: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      _details: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    template(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    summonOnboarder(
      _moloch: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      _price: PromiseOrValue<BigNumberish>,
      _expiery: PromiseOrValue<BigNumberish>,
      _shares: PromiseOrValue<boolean>,
      _cuts: PromiseOrValue<string>[],
      _amounts: PromiseOrValue<BigNumberish>[],
      _details: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    template(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
