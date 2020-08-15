import { MYSON } from "../myson";
import { MResult, MBuffer } from "..";

MYSON.addRule<boolean>({
  unique: 3,
  matchObject(data) {
    return data.constructor == Boolean
  },
  toMYSON(data) {
    return MResult.from(data ? 1 : 0);
  },
  fromMYSON(buf: MBuffer, flags): boolean {
    return flags ? true : false;
  }
});