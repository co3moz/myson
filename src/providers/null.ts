import { MYSON } from "../myson";
import { MResult, MBuffer } from "..";

MYSON.addRule({
  unique: MYSON.nextUnique(),
  matchObject(data: any) {
    return data == null;
  },
  toMYSON(data: any) {
    return MResult.from(data === undefined ? 1 : 0);
  },
  fromMYSON(buf: MBuffer, flags): null | undefined {
    return flags ? undefined : null;
  }
});