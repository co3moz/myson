import { MYSON } from "../myson";
import { MResult, MBuffer } from "..";

MYSON.addRule({
  unique: MYSON.nextUnique(),
  matchObject(data: any) {
    return data.constructor == String;
  },
  toMYSON(data: string) {
    return MResult.from(data.length, Buffer.from(data));
  },
  fromMYSON(buf: MBuffer, flags: number): string {
    return buf.slice(flags).toString();
  }
});