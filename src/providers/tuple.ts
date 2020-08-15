import { MYSON } from "../myson";
import { HasByConstructor, FindByConstructor, FindById } from "../utils/tuple";
import { MResult } from "../utils/mresult";
import { MBuffer } from "../utils/mbuffer";

MYSON.addRule<any>({
  unique: 7,
  matchObject(data: any) {
    return HasByConstructor(data.constructor)
  },
  toMYSON(data, opts) {
    const { fields, id } = FindByConstructor(data.constructor);
    return MResult.from(id, Buffer.concat(fields.map(field => MYSON.binarify(data[field], opts))));
  },
  fromMYSON(buf: MBuffer, id: number): any {
    const { klass, fields } = FindById(id);
    const handler = new (klass as any)();

    for (const field of fields) {
      handler[field] = MYSON.parseEntity(buf)
    }

    return handler;
  }
});