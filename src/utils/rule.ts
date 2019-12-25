import { MResult } from "./mresult";
import { MBuffer } from "./mbuffer";

export interface Rule<T = any> {
  unique: number
  matchObject(data: T): boolean;
  toMYSON(data: T): MResult;
  fromMYSON(buf: MBuffer, flags: number): T;
}
