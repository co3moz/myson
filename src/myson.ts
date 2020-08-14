import { MBuffer } from "./utils/mbuffer";
import { Rule } from "./utils/rule";
import { Constructor } from "./utils/constructor";
import { learn } from "./utils/custom";

const rules = new Map<number, Rule>();
let unique = 0;
export class MYSON {
  static binarify(obj: any) {
    for (let rule of rules.values()) {
      if (rule.matchObject(obj))
        return rule.toMYSON(obj).finish(rule);
    }

    throw new Error('Unsupported type');
  }

  static parse<T>(buf: Buffer): T {
    return this.parseEntity(MBuffer.from(buf));
  }

  static learn<T>(id: number, klass: Constructor<T>, fields: (keyof T)[]) {
    learn(id, klass, fields);
  }

  static parseEntity(buf: MBuffer) {
    let flags = buf.deflag();
    const type = flags & 0b1111;
    flags = flags >>> 4;
    let rule = rules.get(type);
    return rule.fromMYSON(buf, flags)
  }

  static addRule(rule: Rule) {
    if (rules.size > 15) throw new Error('Rule limit reached!');
    rules.set(rule.unique, rule);
  }

  static nextUnique() {
    return unique++;
  }
}