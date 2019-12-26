import { MYSON } from "../myson";
import { MResult, MBuffer } from "..";
import { HasByConstructor, FindByConstructor, FindById } from "../utils/custom";

MYSON.addRule({
  unique: MYSON.nextUnique(),
  matchObject(data: any) {
    return HasByConstructor(data.constructor)
  },
  toMYSON(data: any) {
    const { fields, id } = FindByConstructor(data.constructor);
    return MResult.from(id, Buffer.concat(fields.map(field => MYSON.binarify(data[field]))));
  },
  fromMYSON(buf: MBuffer, id: number): any {
    const { klass, fields } = FindById(id);
    const handler = new (klass as any)();
    fields.forEach(field => handler[field] = MYSON.parseEntity(buf));
    return handler;
  }
});