import { MResult } from "./mresult";
import { MBuffer } from "./mbuffer";

export enum NumberSerializationOptions {
  default = 0, // default behaviour
  alwaysDouble = 1, // always 1byte+8byte encoding
  noFlagger = 2, // 1 byte or 9byte encoding (no dynamic extension)
}

export interface SerializationOptions {
  numbers?: NumberSerializationOptions
}

export interface Rule<T = any, K = T> {
  unique: number
  matchObject(data: unknown): boolean;
  toMYSON(data: T, options?: SerializationOptions): MResult;
  fromMYSON(buf: MBuffer, flags: number): K;
}
