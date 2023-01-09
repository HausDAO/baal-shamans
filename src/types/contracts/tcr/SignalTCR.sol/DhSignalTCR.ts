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

export declare namespace DhSignalTCR {
  export type BatchVoteParamStruct = {
    choiceId: PromiseOrValue<BigNumberish>;
    amount: PromiseOrValue<BigNumberish>;
  };

  export type BatchVoteParamStructOutput = [number, BigNumber] & {
    choiceId: number;
    amount: BigNumber;
  };

  export type VoteStruct = {
    released: PromiseOrValue<boolean>;
    voter: PromiseOrValue<string>;
    amount: PromiseOrValue<BigNumberish>;
    choiceId: PromiseOrValue<BigNumberish>;
    voteId: PromiseOrValue<BigNumberish>;
  };

  export type VoteStructOutput = [
    boolean,
    string,
    BigNumber,
    number,
    BigNumber
  ] & {
    released: boolean;
    voter: string;
    amount: BigNumber;
    choiceId: number;
    voteId: BigNumber;
  };
}

export interface DhSignalTCRInterface extends utils.Interface {
  functions: {
    "areTokensLocked(uint56)": FunctionFragment;
    "baal()": FunctionFragment;
    "baalLoot()": FunctionFragment;
    "baalShares()": FunctionFragment;
    "claim(address)": FunctionFragment;
    "claimAndVote((uint48,uint152)[])": FunctionFragment;
    "currentTimestamp()": FunctionFragment;
    "getVotesForAddress(address)": FunctionFragment;
    "lootSnapshotId()": FunctionFragment;
    "releaseTokens(uint256[])": FunctionFragment;
    "setUp(address)": FunctionFragment;
    "sharesSnapshotId()": FunctionFragment;
    "vote((uint48,uint152)[])": FunctionFragment;
    "voterBalances(address)": FunctionFragment;
    "voterToVoteIds(address,uint256)": FunctionFragment;
    "votes(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "areTokensLocked"
      | "baal"
      | "baalLoot"
      | "baalShares"
      | "claim"
      | "claimAndVote"
      | "currentTimestamp"
      | "getVotesForAddress"
      | "lootSnapshotId"
      | "releaseTokens"
      | "setUp"
      | "sharesSnapshotId"
      | "vote"
      | "voterBalances"
      | "voterToVoteIds"
      | "votes"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "areTokensLocked",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "baal", values?: undefined): string;
  encodeFunctionData(functionFragment: "baalLoot", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "baalShares",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "claim",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "claimAndVote",
    values: [DhSignalTCR.BatchVoteParamStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "currentTimestamp",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getVotesForAddress",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "lootSnapshotId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "releaseTokens",
    values: [PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setUp",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "sharesSnapshotId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "vote",
    values: [DhSignalTCR.BatchVoteParamStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "voterBalances",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "voterToVoteIds",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "votes",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "areTokensLocked",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "baal", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "baalLoot", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "baalShares", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimAndVote",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "currentTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVotesForAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lootSnapshotId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "releaseTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setUp", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "sharesSnapshotId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "vote", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "voterBalances",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "voterToVoteIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "votes", data: BytesLike): Result;

  events: {
    "ClaimTokens(address,uint256)": EventFragment;
    "Init(uint256,uint256)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "TokensReleased(uint56,address,uint152,uint48)": EventFragment;
    "VoteCasted(uint56,address,uint152,uint48)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ClaimTokens"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Init"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokensReleased"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "VoteCasted"): EventFragment;
}

export interface ClaimTokensEventObject {
  voter: string;
  amount: BigNumber;
}
export type ClaimTokensEvent = TypedEvent<
  [string, BigNumber],
  ClaimTokensEventObject
>;

export type ClaimTokensEventFilter = TypedEventFilter<ClaimTokensEvent>;

export interface InitEventObject {
  sharesSnapshotId: BigNumber;
  lootSnapshotId: BigNumber;
}
export type InitEvent = TypedEvent<[BigNumber, BigNumber], InitEventObject>;

export type InitEventFilter = TypedEventFilter<InitEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface TokensReleasedEventObject {
  voteId: BigNumber;
  voter: string;
  amount: BigNumber;
  choiceId: number;
}
export type TokensReleasedEvent = TypedEvent<
  [BigNumber, string, BigNumber, number],
  TokensReleasedEventObject
>;

export type TokensReleasedEventFilter = TypedEventFilter<TokensReleasedEvent>;

export interface VoteCastedEventObject {
  voteId: BigNumber;
  voter: string;
  amount: BigNumber;
  choiceId: number;
}
export type VoteCastedEvent = TypedEvent<
  [BigNumber, string, BigNumber, number],
  VoteCastedEventObject
>;

export type VoteCastedEventFilter = TypedEventFilter<VoteCastedEvent>;

export interface DhSignalTCR extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DhSignalTCRInterface;

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
    areTokensLocked(
      _voteId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    baal(overrides?: CallOverrides): Promise<[string]>;

    baalLoot(overrides?: CallOverrides): Promise<[string]>;

    baalShares(overrides?: CallOverrides): Promise<[string]>;

    claim(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    claimAndVote(
      _batch: DhSignalTCR.BatchVoteParamStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    currentTimestamp(overrides?: CallOverrides): Promise<[BigNumber]>;

    getVotesForAddress(
      _voter: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[DhSignalTCR.VoteStructOutput[]]>;

    lootSnapshotId(overrides?: CallOverrides): Promise<[BigNumber]>;

    releaseTokens(
      _voteIds: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setUp(
      _baalAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sharesSnapshotId(overrides?: CallOverrides): Promise<[BigNumber]>;

    vote(
      _batch: DhSignalTCR.BatchVoteParamStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    voterBalances(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean, BigNumber] & { claimed: boolean; balance: BigNumber }>;

    voterToVoteIds(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    votes(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [boolean, string, BigNumber, number, BigNumber] & {
        released: boolean;
        voter: string;
        amount: BigNumber;
        choiceId: number;
        voteId: BigNumber;
      }
    >;
  };

  areTokensLocked(
    _voteId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  baal(overrides?: CallOverrides): Promise<string>;

  baalLoot(overrides?: CallOverrides): Promise<string>;

  baalShares(overrides?: CallOverrides): Promise<string>;

  claim(
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  claimAndVote(
    _batch: DhSignalTCR.BatchVoteParamStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  currentTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

  getVotesForAddress(
    _voter: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<DhSignalTCR.VoteStructOutput[]>;

  lootSnapshotId(overrides?: CallOverrides): Promise<BigNumber>;

  releaseTokens(
    _voteIds: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setUp(
    _baalAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sharesSnapshotId(overrides?: CallOverrides): Promise<BigNumber>;

  vote(
    _batch: DhSignalTCR.BatchVoteParamStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  voterBalances(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[boolean, BigNumber] & { claimed: boolean; balance: BigNumber }>;

  voterToVoteIds(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  votes(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [boolean, string, BigNumber, number, BigNumber] & {
      released: boolean;
      voter: string;
      amount: BigNumber;
      choiceId: number;
      voteId: BigNumber;
    }
  >;

  callStatic: {
    areTokensLocked(
      _voteId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    baal(overrides?: CallOverrides): Promise<string>;

    baalLoot(overrides?: CallOverrides): Promise<string>;

    baalShares(overrides?: CallOverrides): Promise<string>;

    claim(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    claimAndVote(
      _batch: DhSignalTCR.BatchVoteParamStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    currentTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    getVotesForAddress(
      _voter: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<DhSignalTCR.VoteStructOutput[]>;

    lootSnapshotId(overrides?: CallOverrides): Promise<BigNumber>;

    releaseTokens(
      _voteIds: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    setUp(
      _baalAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    sharesSnapshotId(overrides?: CallOverrides): Promise<BigNumber>;

    vote(
      _batch: DhSignalTCR.BatchVoteParamStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    voterBalances(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean, BigNumber] & { claimed: boolean; balance: BigNumber }>;

    voterToVoteIds(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    votes(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [boolean, string, BigNumber, number, BigNumber] & {
        released: boolean;
        voter: string;
        amount: BigNumber;
        choiceId: number;
        voteId: BigNumber;
      }
    >;
  };

  filters: {
    "ClaimTokens(address,uint256)"(
      voter?: PromiseOrValue<string> | null,
      amount?: null
    ): ClaimTokensEventFilter;
    ClaimTokens(
      voter?: PromiseOrValue<string> | null,
      amount?: null
    ): ClaimTokensEventFilter;

    "Init(uint256,uint256)"(
      sharesSnapshotId?: null,
      lootSnapshotId?: null
    ): InitEventFilter;
    Init(sharesSnapshotId?: null, lootSnapshotId?: null): InitEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "TokensReleased(uint56,address,uint152,uint48)"(
      voteId?: null,
      voter?: PromiseOrValue<string> | null,
      amount?: null,
      choiceId?: null
    ): TokensReleasedEventFilter;
    TokensReleased(
      voteId?: null,
      voter?: PromiseOrValue<string> | null,
      amount?: null,
      choiceId?: null
    ): TokensReleasedEventFilter;

    "VoteCasted(uint56,address,uint152,uint48)"(
      voteId?: null,
      voter?: PromiseOrValue<string> | null,
      amount?: null,
      choiceId?: null
    ): VoteCastedEventFilter;
    VoteCasted(
      voteId?: null,
      voter?: PromiseOrValue<string> | null,
      amount?: null,
      choiceId?: null
    ): VoteCastedEventFilter;
  };

  estimateGas: {
    areTokensLocked(
      _voteId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    baal(overrides?: CallOverrides): Promise<BigNumber>;

    baalLoot(overrides?: CallOverrides): Promise<BigNumber>;

    baalShares(overrides?: CallOverrides): Promise<BigNumber>;

    claim(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    claimAndVote(
      _batch: DhSignalTCR.BatchVoteParamStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    currentTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    getVotesForAddress(
      _voter: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lootSnapshotId(overrides?: CallOverrides): Promise<BigNumber>;

    releaseTokens(
      _voteIds: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setUp(
      _baalAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sharesSnapshotId(overrides?: CallOverrides): Promise<BigNumber>;

    vote(
      _batch: DhSignalTCR.BatchVoteParamStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    voterBalances(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    voterToVoteIds(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    votes(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    areTokensLocked(
      _voteId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    baal(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    baalLoot(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    baalShares(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    claim(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    claimAndVote(
      _batch: DhSignalTCR.BatchVoteParamStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    currentTimestamp(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getVotesForAddress(
      _voter: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lootSnapshotId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    releaseTokens(
      _voteIds: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setUp(
      _baalAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sharesSnapshotId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    vote(
      _batch: DhSignalTCR.BatchVoteParamStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    voterBalances(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    voterToVoteIds(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    votes(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
