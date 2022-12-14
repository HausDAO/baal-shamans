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
  PayableOverrides,
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
} from "../../../../common";

export interface BaalSummonerInterface extends utils.Interface {
  functions: {
    "deployModule(address,bytes,uint256)": FunctionFragment;
    "encodeMultisend(bytes[],address)": FunctionFragment;
    "gnosisFallbackLibrary()": FunctionFragment;
    "gnosisMultisendLibrary()": FunctionFragment;
    "gnosisSingleton()": FunctionFragment;
    "lootSingleton()": FunctionFragment;
    "sharesSingleton()": FunctionFragment;
    "summonBaal(bytes,bytes[],uint256)": FunctionFragment;
    "summonBaalAndSafe(bytes,bytes[],uint256)": FunctionFragment;
    "summonBaalFromReferrer(bytes,bytes[],uint256,bool,bytes32)": FunctionFragment;
    "template()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "deployModule"
      | "encodeMultisend"
      | "gnosisFallbackLibrary"
      | "gnosisMultisendLibrary"
      | "gnosisSingleton"
      | "lootSingleton"
      | "sharesSingleton"
      | "summonBaal"
      | "summonBaalAndSafe"
      | "summonBaalFromReferrer"
      | "template"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "deployModule",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "encodeMultisend",
    values: [PromiseOrValue<BytesLike>[], PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "gnosisFallbackLibrary",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "gnosisMultisendLibrary",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "gnosisSingleton",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lootSingleton",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "sharesSingleton",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "summonBaal",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "summonBaalAndSafe",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "summonBaalFromReferrer",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>[],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(functionFragment: "template", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "deployModule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "encodeMultisend",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "gnosisFallbackLibrary",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "gnosisMultisendLibrary",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "gnosisSingleton",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lootSingleton",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sharesSingleton",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "summonBaal", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "summonBaalAndSafe",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "summonBaalFromReferrer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "template", data: BytesLike): Result;

  events: {
    "DaoReferral(bytes32,bool,address)": EventFragment;
    "ModuleProxyCreation(address,address)": EventFragment;
    "SummonBaal(address,address,address,address,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DaoReferral"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ModuleProxyCreation"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SummonBaal"): EventFragment;
}

export interface DaoReferralEventObject {
  referrer: string;
  daoHadExistingSafe: boolean;
  daoAddress: string;
}
export type DaoReferralEvent = TypedEvent<
  [string, boolean, string],
  DaoReferralEventObject
>;

export type DaoReferralEventFilter = TypedEventFilter<DaoReferralEvent>;

export interface ModuleProxyCreationEventObject {
  proxy: string;
  masterCopy: string;
}
export type ModuleProxyCreationEvent = TypedEvent<
  [string, string],
  ModuleProxyCreationEventObject
>;

export type ModuleProxyCreationEventFilter =
  TypedEventFilter<ModuleProxyCreationEvent>;

export interface SummonBaalEventObject {
  baal: string;
  loot: string;
  shares: string;
  safe: string;
  existingSafe: boolean;
}
export type SummonBaalEvent = TypedEvent<
  [string, string, string, string, boolean],
  SummonBaalEventObject
>;

export type SummonBaalEventFilter = TypedEventFilter<SummonBaalEvent>;

export interface BaalSummoner extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BaalSummonerInterface;

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
    deployModule(
      masterCopy: PromiseOrValue<string>,
      initializer: PromiseOrValue<BytesLike>,
      saltNonce: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    encodeMultisend(
      _calls: PromiseOrValue<BytesLike>[],
      _target: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string] & { encodedMultisend: string }>;

    gnosisFallbackLibrary(overrides?: CallOverrides): Promise<[string]>;

    gnosisMultisendLibrary(overrides?: CallOverrides): Promise<[string]>;

    gnosisSingleton(overrides?: CallOverrides): Promise<[string]>;

    lootSingleton(overrides?: CallOverrides): Promise<[string]>;

    sharesSingleton(overrides?: CallOverrides): Promise<[string]>;

    summonBaal(
      initializationParams: PromiseOrValue<BytesLike>,
      initializationActions: PromiseOrValue<BytesLike>[],
      _saltNonce: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    summonBaalAndSafe(
      initializationParams: PromiseOrValue<BytesLike>,
      initializationActions: PromiseOrValue<BytesLike>[],
      _saltNonce: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    summonBaalFromReferrer(
      initializationParams: PromiseOrValue<BytesLike>,
      initializationActions: PromiseOrValue<BytesLike>[],
      _saltNonce: PromiseOrValue<BigNumberish>,
      existingSafe: PromiseOrValue<boolean>,
      referrer: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    template(overrides?: CallOverrides): Promise<[string]>;
  };

  deployModule(
    masterCopy: PromiseOrValue<string>,
    initializer: PromiseOrValue<BytesLike>,
    saltNonce: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  encodeMultisend(
    _calls: PromiseOrValue<BytesLike>[],
    _target: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  gnosisFallbackLibrary(overrides?: CallOverrides): Promise<string>;

  gnosisMultisendLibrary(overrides?: CallOverrides): Promise<string>;

  gnosisSingleton(overrides?: CallOverrides): Promise<string>;

  lootSingleton(overrides?: CallOverrides): Promise<string>;

  sharesSingleton(overrides?: CallOverrides): Promise<string>;

  summonBaal(
    initializationParams: PromiseOrValue<BytesLike>,
    initializationActions: PromiseOrValue<BytesLike>[],
    _saltNonce: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  summonBaalAndSafe(
    initializationParams: PromiseOrValue<BytesLike>,
    initializationActions: PromiseOrValue<BytesLike>[],
    _saltNonce: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  summonBaalFromReferrer(
    initializationParams: PromiseOrValue<BytesLike>,
    initializationActions: PromiseOrValue<BytesLike>[],
    _saltNonce: PromiseOrValue<BigNumberish>,
    existingSafe: PromiseOrValue<boolean>,
    referrer: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  template(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    deployModule(
      masterCopy: PromiseOrValue<string>,
      initializer: PromiseOrValue<BytesLike>,
      saltNonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    encodeMultisend(
      _calls: PromiseOrValue<BytesLike>[],
      _target: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    gnosisFallbackLibrary(overrides?: CallOverrides): Promise<string>;

    gnosisMultisendLibrary(overrides?: CallOverrides): Promise<string>;

    gnosisSingleton(overrides?: CallOverrides): Promise<string>;

    lootSingleton(overrides?: CallOverrides): Promise<string>;

    sharesSingleton(overrides?: CallOverrides): Promise<string>;

    summonBaal(
      initializationParams: PromiseOrValue<BytesLike>,
      initializationActions: PromiseOrValue<BytesLike>[],
      _saltNonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    summonBaalAndSafe(
      initializationParams: PromiseOrValue<BytesLike>,
      initializationActions: PromiseOrValue<BytesLike>[],
      _saltNonce: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    summonBaalFromReferrer(
      initializationParams: PromiseOrValue<BytesLike>,
      initializationActions: PromiseOrValue<BytesLike>[],
      _saltNonce: PromiseOrValue<BigNumberish>,
      existingSafe: PromiseOrValue<boolean>,
      referrer: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    template(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "DaoReferral(bytes32,bool,address)"(
      referrer?: null,
      daoHadExistingSafe?: null,
      daoAddress?: null
    ): DaoReferralEventFilter;
    DaoReferral(
      referrer?: null,
      daoHadExistingSafe?: null,
      daoAddress?: null
    ): DaoReferralEventFilter;

    "ModuleProxyCreation(address,address)"(
      proxy?: PromiseOrValue<string> | null,
      masterCopy?: PromiseOrValue<string> | null
    ): ModuleProxyCreationEventFilter;
    ModuleProxyCreation(
      proxy?: PromiseOrValue<string> | null,
      masterCopy?: PromiseOrValue<string> | null
    ): ModuleProxyCreationEventFilter;

    "SummonBaal(address,address,address,address,bool)"(
      baal?: PromiseOrValue<string> | null,
      loot?: PromiseOrValue<string> | null,
      shares?: PromiseOrValue<string> | null,
      safe?: null,
      existingSafe?: null
    ): SummonBaalEventFilter;
    SummonBaal(
      baal?: PromiseOrValue<string> | null,
      loot?: PromiseOrValue<string> | null,
      shares?: PromiseOrValue<string> | null,
      safe?: null,
      existingSafe?: null
    ): SummonBaalEventFilter;
  };

  estimateGas: {
    deployModule(
      masterCopy: PromiseOrValue<string>,
      initializer: PromiseOrValue<BytesLike>,
      saltNonce: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    encodeMultisend(
      _calls: PromiseOrValue<BytesLike>[],
      _target: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    gnosisFallbackLibrary(overrides?: CallOverrides): Promise<BigNumber>;

    gnosisMultisendLibrary(overrides?: CallOverrides): Promise<BigNumber>;

    gnosisSingleton(overrides?: CallOverrides): Promise<BigNumber>;

    lootSingleton(overrides?: CallOverrides): Promise<BigNumber>;

    sharesSingleton(overrides?: CallOverrides): Promise<BigNumber>;

    summonBaal(
      initializationParams: PromiseOrValue<BytesLike>,
      initializationActions: PromiseOrValue<BytesLike>[],
      _saltNonce: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    summonBaalAndSafe(
      initializationParams: PromiseOrValue<BytesLike>,
      initializationActions: PromiseOrValue<BytesLike>[],
      _saltNonce: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    summonBaalFromReferrer(
      initializationParams: PromiseOrValue<BytesLike>,
      initializationActions: PromiseOrValue<BytesLike>[],
      _saltNonce: PromiseOrValue<BigNumberish>,
      existingSafe: PromiseOrValue<boolean>,
      referrer: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    template(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    deployModule(
      masterCopy: PromiseOrValue<string>,
      initializer: PromiseOrValue<BytesLike>,
      saltNonce: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    encodeMultisend(
      _calls: PromiseOrValue<BytesLike>[],
      _target: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    gnosisFallbackLibrary(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    gnosisMultisendLibrary(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    gnosisSingleton(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lootSingleton(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sharesSingleton(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    summonBaal(
      initializationParams: PromiseOrValue<BytesLike>,
      initializationActions: PromiseOrValue<BytesLike>[],
      _saltNonce: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    summonBaalAndSafe(
      initializationParams: PromiseOrValue<BytesLike>,
      initializationActions: PromiseOrValue<BytesLike>[],
      _saltNonce: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    summonBaalFromReferrer(
      initializationParams: PromiseOrValue<BytesLike>,
      initializationActions: PromiseOrValue<BytesLike>[],
      _saltNonce: PromiseOrValue<BigNumberish>,
      existingSafe: PromiseOrValue<boolean>,
      referrer: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    template(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
