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

export declare namespace MemberRegistry {
  export type MemberStruct = {
    account: PromiseOrValue<string>;
    secondsActive: PromiseOrValue<BigNumberish>;
    activityMultiplier: PromiseOrValue<BigNumberish>;
  };

  export type MemberStructOutput = [string, number, number] & {
    account: string;
    secondsActive: number;
    activityMultiplier: number;
  };
}

export interface MemberRegistryInterface extends utils.Interface {
  functions: {
    "claim()": FunctionFragment;
    "count()": FunctionFragment;
    "lastTrigger()": FunctionFragment;
    "lastUpdate()": FunctionFragment;
    "memberIdxs(address)": FunctionFragment;
    "members(uint256)": FunctionFragment;
    "trigger()": FunctionFragment;
    "updateSecondsActive()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "claim"
      | "count"
      | "lastTrigger"
      | "lastUpdate"
      | "memberIdxs"
      | "members"
      | "trigger"
      | "updateSecondsActive"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "claim", values?: undefined): string;
  encodeFunctionData(functionFragment: "count", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "lastTrigger",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lastUpdate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "memberIdxs",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "members",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "trigger", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "updateSecondsActive",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "count", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "lastTrigger",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lastUpdate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "memberIdxs", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "members", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "trigger", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateSecondsActive",
    data: BytesLike
  ): Result;

  events: {
    "Claim(address)": EventFragment;
    "SetMember(tuple)": EventFragment;
    "Trigger(uint32)": EventFragment;
    "Update(uint32)": EventFragment;
    "UpdateMember(tuple)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Claim"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SetMember"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Trigger"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Update"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateMember"): EventFragment;
}

export interface ClaimEventObject {
  arg0: string;
}
export type ClaimEvent = TypedEvent<[string], ClaimEventObject>;

export type ClaimEventFilter = TypedEventFilter<ClaimEvent>;

export interface SetMemberEventObject {
  member: MemberRegistry.MemberStructOutput;
}
export type SetMemberEvent = TypedEvent<
  [MemberRegistry.MemberStructOutput],
  SetMemberEventObject
>;

export type SetMemberEventFilter = TypedEventFilter<SetMemberEvent>;

export interface TriggerEventObject {
  arg0: number;
}
export type TriggerEvent = TypedEvent<[number], TriggerEventObject>;

export type TriggerEventFilter = TypedEventFilter<TriggerEvent>;

export interface UpdateEventObject {
  arg0: number;
}
export type UpdateEvent = TypedEvent<[number], UpdateEventObject>;

export type UpdateEventFilter = TypedEventFilter<UpdateEvent>;

export interface UpdateMemberEventObject {
  member: MemberRegistry.MemberStructOutput;
}
export type UpdateMemberEvent = TypedEvent<
  [MemberRegistry.MemberStructOutput],
  UpdateMemberEventObject
>;

export type UpdateMemberEventFilter = TypedEventFilter<UpdateMemberEvent>;

export interface MemberRegistry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MemberRegistryInterface;

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
    claim(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    count(overrides?: CallOverrides): Promise<[BigNumber]>;

    lastTrigger(overrides?: CallOverrides): Promise<[number]>;

    lastUpdate(overrides?: CallOverrides): Promise<[number]>;

    memberIdxs(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    members(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, number, number] & {
        account: string;
        secondsActive: number;
        activityMultiplier: number;
      }
    >;

    trigger(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateSecondsActive(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  claim(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  count(overrides?: CallOverrides): Promise<BigNumber>;

  lastTrigger(overrides?: CallOverrides): Promise<number>;

  lastUpdate(overrides?: CallOverrides): Promise<number>;

  memberIdxs(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  members(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [string, number, number] & {
      account: string;
      secondsActive: number;
      activityMultiplier: number;
    }
  >;

  trigger(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateSecondsActive(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    claim(overrides?: CallOverrides): Promise<void>;

    count(overrides?: CallOverrides): Promise<BigNumber>;

    lastTrigger(overrides?: CallOverrides): Promise<number>;

    lastUpdate(overrides?: CallOverrides): Promise<number>;

    memberIdxs(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    members(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, number, number] & {
        account: string;
        secondsActive: number;
        activityMultiplier: number;
      }
    >;

    trigger(overrides?: CallOverrides): Promise<void>;

    updateSecondsActive(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "Claim(address)"(arg0?: null): ClaimEventFilter;
    Claim(arg0?: null): ClaimEventFilter;

    "SetMember(tuple)"(member?: null): SetMemberEventFilter;
    SetMember(member?: null): SetMemberEventFilter;

    "Trigger(uint32)"(arg0?: null): TriggerEventFilter;
    Trigger(arg0?: null): TriggerEventFilter;

    "Update(uint32)"(arg0?: null): UpdateEventFilter;
    Update(arg0?: null): UpdateEventFilter;

    "UpdateMember(tuple)"(member?: null): UpdateMemberEventFilter;
    UpdateMember(member?: null): UpdateMemberEventFilter;
  };

  estimateGas: {
    claim(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    count(overrides?: CallOverrides): Promise<BigNumber>;

    lastTrigger(overrides?: CallOverrides): Promise<BigNumber>;

    lastUpdate(overrides?: CallOverrides): Promise<BigNumber>;

    memberIdxs(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    members(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    trigger(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateSecondsActive(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    claim(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    count(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lastTrigger(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lastUpdate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    memberIdxs(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    members(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    trigger(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateSecondsActive(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
