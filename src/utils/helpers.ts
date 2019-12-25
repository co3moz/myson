import { MResult } from "./mresult";
import { MYSON } from "..";
import { MBuffer } from "./mbuffer";

type Constructor<T> = new (...args: any[]) => T;

interface CollectionObject<T = any> {
  klass: Constructor<T>
  fields: (keyof T)[]
  key: number
}

export const helpers = {
  toMYSON<T>(obj: T, fields: (keyof T)[], flag = 0): MResult {
    return MResult.from(flag, Buffer.concat(fields.map(field => MYSON.binarify(obj[field]))));
  },
  fromMYSON<T>(buf: MBuffer, fields: (keyof T)[], handler: T): T {
    fields.forEach(field => handler[field] = MYSON.parseEntity(buf));
    return handler;
  },
  learn<T>(klass: Constructor<T>, fields: (keyof T)[]) {
    MYSON.addRule({
      unique: MYSON.nextUnique(),
      matchObject(data: any) {
        return data.constructor == klass;
      },
      toMYSON(data: T) {
        return MYSON.helpers.toMYSON(data, fields);
      },
      fromMYSON(buf: MBuffer): T {
        return MYSON.helpers.fromMYSON(buf, fields, new (klass as any)());
      }
    });
  },
  learnCollection(collection: [Constructor<any>, ...string[]][]) {
    const map = new Map<Constructor<any>, CollectionObject>();
    const unique = new Map<number, CollectionObject>();

    let i = 0;
    for (let [klass, ...fields] of collection) {
      let key = i++;
      let obj: CollectionObject = { fields, key, klass };
      map.set(klass, obj);
      unique.set(key, obj);
    }

    MYSON.addRule({
      unique: MYSON.nextUnique(),
      matchObject(data: any) {
        return map.has(data.constructor)
      },
      toMYSON(data: any) {
        const { fields, key } = map.get(data.constructor);
        return MYSON.helpers.toMYSON(data, fields, key);
      },
      fromMYSON(buf: MBuffer, flags: number): any {
        const { klass, fields } = unique.get(flags)
        return MYSON.helpers.fromMYSON(buf, fields, new (klass as any)());
      }
    });
  }
}



