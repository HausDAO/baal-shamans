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

export interface CheckInShamanV2Interface extends utils.Interface {
  functions: {
    "baal()": FunctionFragment;
    "checkInInterval()": FunctionFragment;
    "claim(uint64[],uint8[],string)": FunctionFragment;
    "init(address,address,bool,uint256,uint256,uint32[5])": FunctionFragment;
    "isLocked()": FunctionFragment;
    "lock(bool)": FunctionFragment;
    "mutiny(address)": FunctionFragment;
    "post(string,string)": FunctionFragment;
    "sharesOrLoot()": FunctionFragment;
    "teamLead()": FunctionFragment;
    "timeLedger(address)": FunctionFragment;
    "token()": FunctionFragment;
    "tokenPerSecond()": FunctionFragment;
    "updateCheckInInterval(uint256)": FunctionFragment;
    "updateTokenPerSecond(uint256)": FunctionFragment;
    "updateValueScalePercs(uint32[5])": FunctionFragment;
    "valueScalePercs(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "baal"
      | "checkInInterval"
      | "claim"
      | "init"
      | "isLocked"
      | "lock"
      | "mutiny"
      | "post"
      | "sharesOrLoot"
      | "teamLead"
      | "timeLedger"
      | "token"
      | "tokenPerSecond"
      | "updateCheckInInterval"
      | "updateTokenPerSecond"
      | "updateValueScalePercs"
      | "valueScalePercs"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "baal", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "checkInInterval",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "claim",
    values: [
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "init",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<boolean>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ]
    ]
  ): string;
  encodeFunctionData(functionFragment: "isLocked", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "lock",
    values: [PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "mutiny",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "post",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "sharesOrLoot",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "teamLead", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "timeLedger",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tokenPerSecond",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "updateCheckInInterval",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateTokenPerSecond",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateValueScalePercs",
    values: [
      [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "valueScalePercs",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "baal", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "checkInInterval",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "init", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isLocked", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "lock", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mutiny", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "post", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "sharesOrLoot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "teamLead", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "timeLedger", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tokenPerSecond",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateCheckInInterval",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateTokenPerSecond",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateValueScalePercs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "valueScalePercs",
    data: BytesLike
  ): Result;

  events: {
    "Claim(address,uint256,uint256,uint64,uint64[],uint8[],string)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "Mutiny(address,address)": EventFragment;
    "Post(address,string,string)": EventFragment;
    "UpdateInterval(uint256,uint256)": EventFragment;
    "UpdatePercs(uint32[5],uint32[5])": EventFragment;
    "UpdateTokenPerSecond(uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Claim"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Mutiny"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Post"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateInterval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdatePercs"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateTokenPerSecond"): EventFragment;
}

export interface ClaimEventObject {
  account: string;
  timestamp: BigNumber;
  tokenAmountClaimed: BigNumber;
  totalSecondsWorked: BigNumber;
  sessionsTime: BigNumber[];
  sessionsValue: number[];
  metadata: string;
}
export type ClaimEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, BigNumber[], number[], string],
  ClaimEventObject
>;

export type ClaimEventFilter = TypedEventFilter<ClaimEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface MutinyEventObject {
  from: string;
  to: string;
}
export type MutinyEvent = TypedEvent<[string, string], MutinyEventObject>;

export type MutinyEventFilter = TypedEventFilter<MutinyEvent>;

export interface PostEventObject {
  account: string;
  tag: string;
  metadata: string;
}
export type PostEvent = TypedEvent<[string, string, string], PostEventObject>;

export type PostEventFilter = TypedEventFilter<PostEvent>;

export interface UpdateIntervalEventObject {
  from: BigNumber;
  to: BigNumber;
}
export type UpdateIntervalEvent = TypedEvent<
  [BigNumber, BigNumber],
  UpdateIntervalEventObject
>;

export type UpdateIntervalEventFilter = TypedEventFilter<UpdateIntervalEvent>;

export interface UpdatePercsEventObject {
  from: [number, number, number, number, number];
  to: [number, number, number, number, number];
}
export type UpdatePercsEvent = TypedEvent<
  [
    [number, number, number, number, number],
    [number, number, number, number, number]
  ],
  UpdatePercsEventObject
>;

export type UpdatePercsEventFilter = TypedEventFilter<UpdatePercsEvent>;

export interface UpdateTokenPerSecondEventObject {
  from: BigNumber;
  to: BigNumber;
}
export type UpdateTokenPerSecondEvent = TypedEvent<
  [BigNumber, BigNumber],
  UpdateTokenPerSecondEventObject
>;

export type UpdateTokenPerSecondEventFilter =
  TypedEventFilter<UpdateTokenPerSecondEvent>;

export interface CheckInShamanV2 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CheckInShamanV2Interface;

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
    baal(overrides?: CallOverrides): Promise<[string]>;

    checkInInterval(overrides?: CallOverrides): Promise<[BigNumber]>;

    claim(
      _sessionsTime: PromiseOrValue<BigNumberish>[],
      _sessionsValue: PromiseOrValue<BigNumberish>[],
      _metadata: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    init(
      _baal: PromiseOrValue<string>,
      _teamLead: PromiseOrValue<string>,
      _sharesOrLoot: PromiseOrValue<boolean>,
      _tokenPerSecond: PromiseOrValue<BigNumberish>,
      _checkInInterval: PromiseOrValue<BigNumberish>,
      _valueScalePercs: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isLocked(overrides?: CallOverrides): Promise<[boolean]>;

    lock(
      _shouldLock: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    mutiny(
      _newTeamLead: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    post(
      content: PromiseOrValue<string>,
      tag: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sharesOrLoot(overrides?: CallOverrides): Promise<[boolean]>;

    teamLead(overrides?: CallOverrides): Promise<[string]>;

    timeLedger(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    token(overrides?: CallOverrides): Promise<[string]>;

    tokenPerSecond(overrides?: CallOverrides): Promise<[BigNumber]>;

    updateCheckInInterval(
      _newCheckInInterval: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateTokenPerSecond(
      _newTokenPerSecond: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateValueScalePercs(
      _newValueScalePercs: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    valueScalePercs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[number]>;
  };

  baal(overrides?: CallOverrides): Promise<string>;

  checkInInterval(overrides?: CallOverrides): Promise<BigNumber>;

  claim(
    _sessionsTime: PromiseOrValue<BigNumberish>[],
    _sessionsValue: PromiseOrValue<BigNumberish>[],
    _metadata: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  init(
    _baal: PromiseOrValue<string>,
    _teamLead: PromiseOrValue<string>,
    _sharesOrLoot: PromiseOrValue<boolean>,
    _tokenPerSecond: PromiseOrValue<BigNumberish>,
    _checkInInterval: PromiseOrValue<BigNumberish>,
    _valueScalePercs: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isLocked(overrides?: CallOverrides): Promise<boolean>;

  lock(
    _shouldLock: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  mutiny(
    _newTeamLead: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  post(
    content: PromiseOrValue<string>,
    tag: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sharesOrLoot(overrides?: CallOverrides): Promise<boolean>;

  teamLead(overrides?: CallOverrides): Promise<string>;

  timeLedger(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  token(overrides?: CallOverrides): Promise<string>;

  tokenPerSecond(overrides?: CallOverrides): Promise<BigNumber>;

  updateCheckInInterval(
    _newCheckInInterval: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateTokenPerSecond(
    _newTokenPerSecond: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateValueScalePercs(
    _newValueScalePercs: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  valueScalePercs(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<number>;

  callStatic: {
    baal(overrides?: CallOverrides): Promise<string>;

    checkInInterval(overrides?: CallOverrides): Promise<BigNumber>;

    claim(
      _sessionsTime: PromiseOrValue<BigNumberish>[],
      _sessionsValue: PromiseOrValue<BigNumberish>[],
      _metadata: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    init(
      _baal: PromiseOrValue<string>,
      _teamLead: PromiseOrValue<string>,
      _sharesOrLoot: PromiseOrValue<boolean>,
      _tokenPerSecond: PromiseOrValue<BigNumberish>,
      _checkInInterval: PromiseOrValue<BigNumberish>,
      _valueScalePercs: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      overrides?: CallOverrides
    ): Promise<void>;

    isLocked(overrides?: CallOverrides): Promise<boolean>;

    lock(
      _shouldLock: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    mutiny(
      _newTeamLead: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    post(
      content: PromiseOrValue<string>,
      tag: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    sharesOrLoot(overrides?: CallOverrides): Promise<boolean>;

    teamLead(overrides?: CallOverrides): Promise<string>;

    timeLedger(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<string>;

    tokenPerSecond(overrides?: CallOverrides): Promise<BigNumber>;

    updateCheckInInterval(
      _newCheckInInterval: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateTokenPerSecond(
      _newTokenPerSecond: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateValueScalePercs(
      _newValueScalePercs: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      overrides?: CallOverrides
    ): Promise<void>;

    valueScalePercs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<number>;
  };

  filters: {
    "Claim(address,uint256,uint256,uint64,uint64[],uint8[],string)"(
      account?: PromiseOrValue<string> | null,
      timestamp?: null,
      tokenAmountClaimed?: null,
      totalSecondsWorked?: null,
      sessionsTime?: null,
      sessionsValue?: null,
      metadata?: null
    ): ClaimEventFilter;
    Claim(
      account?: PromiseOrValue<string> | null,
      timestamp?: null,
      tokenAmountClaimed?: null,
      totalSecondsWorked?: null,
      sessionsTime?: null,
      sessionsValue?: null,
      metadata?: null
    ): ClaimEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "Mutiny(address,address)"(from?: null, to?: null): MutinyEventFilter;
    Mutiny(from?: null, to?: null): MutinyEventFilter;

    "Post(address,string,string)"(
      account?: PromiseOrValue<string> | null,
      tag?: PromiseOrValue<string> | null,
      metadata?: null
    ): PostEventFilter;
    Post(
      account?: PromiseOrValue<string> | null,
      tag?: PromiseOrValue<string> | null,
      metadata?: null
    ): PostEventFilter;

    "UpdateInterval(uint256,uint256)"(
      from?: null,
      to?: null
    ): UpdateIntervalEventFilter;
    UpdateInterval(from?: null, to?: null): UpdateIntervalEventFilter;

    "UpdatePercs(uint32[5],uint32[5])"(
      from?: null,
      to?: null
    ): UpdatePercsEventFilter;
    UpdatePercs(from?: null, to?: null): UpdatePercsEventFilter;

    "UpdateTokenPerSecond(uint256,uint256)"(
      from?: null,
      to?: null
    ): UpdateTokenPerSecondEventFilter;
    UpdateTokenPerSecond(
      from?: null,
      to?: null
    ): UpdateTokenPerSecondEventFilter;
  };

  estimateGas: {
    baal(overrides?: CallOverrides): Promise<BigNumber>;

    checkInInterval(overrides?: CallOverrides): Promise<BigNumber>;

    claim(
      _sessionsTime: PromiseOrValue<BigNumberish>[],
      _sessionsValue: PromiseOrValue<BigNumberish>[],
      _metadata: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    init(
      _baal: PromiseOrValue<string>,
      _teamLead: PromiseOrValue<string>,
      _sharesOrLoot: PromiseOrValue<boolean>,
      _tokenPerSecond: PromiseOrValue<BigNumberish>,
      _checkInInterval: PromiseOrValue<BigNumberish>,
      _valueScalePercs: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isLocked(overrides?: CallOverrides): Promise<BigNumber>;

    lock(
      _shouldLock: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    mutiny(
      _newTeamLead: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    post(
      content: PromiseOrValue<string>,
      tag: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sharesOrLoot(overrides?: CallOverrides): Promise<BigNumber>;

    teamLead(overrides?: CallOverrides): Promise<BigNumber>;

    timeLedger(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    tokenPerSecond(overrides?: CallOverrides): Promise<BigNumber>;

    updateCheckInInterval(
      _newCheckInInterval: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateTokenPerSecond(
      _newTokenPerSecond: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateValueScalePercs(
      _newValueScalePercs: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    valueScalePercs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    baal(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    checkInInterval(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    claim(
      _sessionsTime: PromiseOrValue<BigNumberish>[],
      _sessionsValue: PromiseOrValue<BigNumberish>[],
      _metadata: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    init(
      _baal: PromiseOrValue<string>,
      _teamLead: PromiseOrValue<string>,
      _sharesOrLoot: PromiseOrValue<boolean>,
      _tokenPerSecond: PromiseOrValue<BigNumberish>,
      _checkInInterval: PromiseOrValue<BigNumberish>,
      _valueScalePercs: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isLocked(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lock(
      _shouldLock: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    mutiny(
      _newTeamLead: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    post(
      content: PromiseOrValue<string>,
      tag: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sharesOrLoot(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    teamLead(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    timeLedger(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenPerSecond(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    updateCheckInInterval(
      _newCheckInInterval: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateTokenPerSecond(
      _newTokenPerSecond: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateValueScalePercs(
      _newValueScalePercs: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
      ],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    valueScalePercs(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}