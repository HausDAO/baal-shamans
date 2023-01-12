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

export interface NFTClaimerShamanSummonerInterface extends utils.Interface {
  functions: {
    "summonNFTClaimer(address,address,bool,uint256)": FunctionFragment;
    "template()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "summonNFTClaimer" | "template"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "summonNFTClaimer",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<boolean>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(functionFragment: "template", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "summonNFTClaimer",
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
  claimer: string;
}
export type SummonCompleteEvent = TypedEvent<
  [string, string],
  SummonCompleteEventObject
>;

export type SummonCompleteEventFilter = TypedEventFilter<SummonCompleteEvent>;

export interface NFTClaimerShamanSummoner extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: NFTClaimerShamanSummonerInterface;

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
    summonNFTClaimer(
      _moloch: PromiseOrValue<string>,
      _nftAddress: PromiseOrValue<string>,
      _isShares: PromiseOrValue<boolean>,
      _perNft: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    template(overrides?: CallOverrides): Promise<[string]>;
  };

  summonNFTClaimer(
    _moloch: PromiseOrValue<string>,
    _nftAddress: PromiseOrValue<string>,
    _isShares: PromiseOrValue<boolean>,
    _perNft: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  template(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    summonNFTClaimer(
      _moloch: PromiseOrValue<string>,
      _nftAddress: PromiseOrValue<string>,
      _isShares: PromiseOrValue<boolean>,
      _perNft: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    template(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "SummonComplete(address,address)"(
      baal?: PromiseOrValue<string> | null,
      claimer?: null
    ): SummonCompleteEventFilter;
    SummonComplete(
      baal?: PromiseOrValue<string> | null,
      claimer?: null
    ): SummonCompleteEventFilter;
  };

  estimateGas: {
    summonNFTClaimer(
      _moloch: PromiseOrValue<string>,
      _nftAddress: PromiseOrValue<string>,
      _isShares: PromiseOrValue<boolean>,
      _perNft: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    template(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    summonNFTClaimer(
      _moloch: PromiseOrValue<string>,
      _nftAddress: PromiseOrValue<string>,
      _isShares: PromiseOrValue<boolean>,
      _perNft: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    template(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
