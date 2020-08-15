import { MYSON } from "../myson";
import { MResult, MBuffer } from "..";

MYSON.addRule<string>({
  unique: 1,
  matchObject(data) {
    return data.constructor == String;
  },
  toMYSON(data) {
    return MResult.from(data.length, Buffer.from(data));
  },
  fromMYSON(buf: MBuffer, flags: number): string {
    return buf.slice(flags).toString();
  }
});