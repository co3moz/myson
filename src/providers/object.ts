import { MYSON } from "../myson";
import { MResult, MBuffer } from "..";

MYSON.addRule({
  unique: MYSON.nextUnique(),
  matchObject(data: any) {
    return data.constructor == Object;
  },
  toMYSON(data: Object) {
    let o = [];

    for (let key in data) {
      o.push(Buffer.concat([MYSON.binarify(key), MYSON.binarify(data[key])]));
    }

    return MResult.from(o.length, Buffer.concat(o));
  },
  fromMYSON(buf: MBuffer, flags: number): object {
    let obj = {};

    for (let i = 0; i < flags; i++) {
      obj[MYSON.parseEntity(buf)] = MYSON.parseEntity(buf);
    }

    return obj;
  }
});