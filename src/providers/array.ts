import { MYSON } from "../myson";
import { MResult, MBuffer } from "..";

MYSON.addRule<any[]>({
  unique: 2,
  matchObject(data) {
    return data.constructor == Array;
  },
  toMYSON(data, opts) {
    let bufarr = [];
    for (let i = 0; i < data.length; i++) {
      bufarr.push(MYSON.binarify(data[i], opts));
    }
    return MResult.from(data.length, Buffer.concat(bufarr));
  },
  fromMYSON(buf: MBuffer, len: number) {
    return Array(len).fill(0).map(x => MYSON.parseEntity(buf));
  }
});