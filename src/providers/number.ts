import { MYSON } from "../myson";
import { MResult, Flagger, MBuffer } from "..";

MYSON.addRule({
  unique: MYSON.nextUnique(),
  matchObject(data: any) {
    return data.constructor == Number
  },
  toMYSON(data: number) {
    if (isNaN(data)) return MResult.from(5);

    if ((data >>> 0) == data) {
      if (data <= 4) {
        return MResult.from(data);
      }

      return MResult.from(6, Flagger(data));
    }

    let buf = Buffer.alloc(8);
    buf.writeDoubleBE(data, 0);
    return MResult.from(7, buf);
  },
  fromMYSON(buf: MBuffer, flag): number {
    if (flag < 5) {
      return flag;
    }

    if (flag == 5) return NaN;

    if (flag == 6) {
      return buf.deflag();
    }

    if (flag == 7) return buf.slice(8).readDoubleBE(0);

    throw new Error('unsupported number type');
  }
});