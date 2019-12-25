import { MYSON } from "../myson";
import { MResult, MBuffer } from "..";

MYSON.addRule({
  unique: MYSON.nextUnique(),
  matchObject(data: any) {
    return data.constructor == Buffer;
  },
  toMYSON(data: Buffer) {
    return MResult.from(data.length, data);
  },
  fromMYSON(buf: MBuffer, flags: number): Buffer {
    return buf.slice(flags);
  }
});