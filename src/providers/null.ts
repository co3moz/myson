import { MYSON } from "../myson";
import { MResult, MBuffer } from "..";

MYSON.addRule<null | undefined>({
  unique: 0,
  matchObject(data) {
    return data == null;
  },
  toMYSON(data) {
    return MResult.from(data === undefined ? 1 : 0);
  },
  fromMYSON(buf: MBuffer, flags): null | undefined {
    return flags ? undefined : null;
  }
});