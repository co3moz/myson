import { MYSON } from "../myson";
import { MResult, MBuffer } from "..";

MYSON.addRule({
  unique: MYSON.nextUnique(),
  matchObject(data: any) {
    return data.constructor == Array;
  },
  toMYSON(data: any[]) {
    return MResult.from(data.length, Buffer.concat(data.map(d => MYSON.binarify(d))));
  },
  fromMYSON(buf: MBuffer, len: number): any[] {
    return Array(len).fill(0).map(x => MYSON.parseEntity(buf));
  }
});