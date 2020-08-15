import { MYSON } from "../myson";
import { MResult, MBuffer } from "..";

MYSON.addRule<Buffer>({
  unique: 6,
  matchObject(data) {
    return data.constructor == Buffer;
  },
  toMYSON(data) {
    return MResult.from(data.length, data);
  },
  fromMYSON(buf: MBuffer, flags: number): Buffer {
    return buf.slice(flags);
  }
});