import { MYSON } from "../myson";
import { MResult, MBuffer } from "..";

MYSON.addRule({
  unique: MYSON.nextUnique(),
  matchObject(data: any) {
    return data.constructor == Boolean
  },
  toMYSON(data: any) {
    return MResult.from(data ? 1 : 0);
  },
  fromMYSON(buf: MBuffer, flags): boolean {
    return flags ? true : false;
  }
});