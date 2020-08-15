import { MBuffer } from "./utils/mbuffer";
import { Rule, SerializationOptions } from "./utils/rule";
import { CompatibleTupleConstructor } from "./utils/constructor";
import { learn } from "./utils/tuple";

const rules = new Map<number, Rule>();


export class MYSON {
  static binarify(obj: any, options?: SerializationOptions) {
    for (let rule of rules.values()) {
      if (rule.matchObject(obj))
        return rule.toMYSON(obj, options).finish(rule);
    }

    throw new Error('Unsupported type');
  }

  static parse<T>(buf: Buffer): T {
    return this.parseEntity(MBuffer.from(buf));
  }

  static tuple<T>(tupleKlass: CompatibleTupleConstructor<T>) {
    learn(tupleKlass);
  }

  static parseEntity(buf: MBuffer) {
    let flags = buf.deflag();
    const type = flags & 0b1111;
    flags = flags >>> 4;
    const rule = rules.get(type);
    if (!rule) {
      throw new Error('Corrupted data. Type is not linked to any rule! (' + type + ')');
    }

    return rule.fromMYSON(buf, flags)
  }

  static addRule<T, K = T>(rule: Rule<T, K>) {
    if (rules.size > 15) throw new Error('Rule limit reached!');
    rules.set(rule.unique, rule);
  }
}