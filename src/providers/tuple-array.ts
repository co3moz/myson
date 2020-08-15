import { MYSON } from "../myson";
import { MResult, MBuffer } from "..";

export class TupleArray<T = object> {
  private constructor(public array: T[], public fields: (keyof T)[]) { }
  static from<T>(array: T[], fields: (keyof T)[]) {
    return new TupleArray<T>(array, fields);
  }
}

MYSON.addRule<TupleArray<any>, any[]>({
  unique: 8,
  matchObject(data) {
    return data.constructor == TupleArray;
  },
  toMYSON(data, opts) {
    const bufarr = [];
    for (const field of data.fields) {
      bufarr.push(MYSON.binarify(field, opts));
    }

    bufarr.push(MYSON.binarify(data.array.length, opts));

    for (const item of data.array) {
      for (const field of data.fields) {
        bufarr.push(MYSON.binarify(item[field], opts));
      }
    }

    return MResult.from(data.fields.length, Buffer.concat(bufarr));
  },
  fromMYSON(buf: MBuffer, fieldLength: number) {
    const fields = [];

    for (let i = 0; i < fieldLength; i++) {
      fields.push(MYSON.parseEntity(buf));
    }

    const length = MYSON.parseEntity(buf);
    const array: any[] = Array(length);

    for (let i = 0; i < length; i++) {
      const item = {};

      for (let j = 0; j < fieldLength; j++) {
        item[fields[j]] = MYSON.parseEntity(buf);
      }

      array[i] = item;
    }

    return array;
  }
});