import { MYSON } from "../myson";
import { MResult, MBuffer } from "..";

MYSON.addRule({
  unique: MYSON.nextUnique(),
  matchObject(data: any) {
    return data.constructor == Array;
  },
  toMYSON(data: any[]) {
    let bufarr = [];
    for (let i = 0; i < data.length; i++) {
      bufarr.push(MYSON.binarify(data[i]));
    }
    return MResult.from(data.length, Buffer.concat(bufarr));
  },
  fromMYSON(buf: MBuffer, len: number): any[] {
    return Array(len).fill(0).map(x => MYSON.parseEntity(buf));
  }
});