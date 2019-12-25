import { MBuffer } from "./utils/mbuffer";
import { Rule } from "./utils/rule";
import { helpers } from "./utils/helpers";

export class MYSON {
  private static rules = new Map<number, Rule>();
  private static lastUnique = 0;
  private static ruleSize = 0;
  private static ruleBitsize = 0;
  private static ruleMask = 0;
  
  static helpers = helpers;

  static binarify(obj: any) {
    for (let rule of this.rules.values()) {
      if (rule.matchObject(obj))
        return rule.toMYSON(obj).finish(rule);
    }

    throw new Error('Unsupported type');
  }

  static parse(buf: Buffer): any {
    return this.parseEntity(MBuffer.from(buf));
  }

  static getBitsize() {
    return MYSON.ruleBitsize;
  }

  static updateRuleSize(value: number) {
    this.ruleSize = value - 1;
    this.ruleBitsize = this.ruleSize.toString(2).length;
    this.ruleMask = (1 << this.ruleBitsize) - 1;
  }

  static nextUnique() { return this.lastUnique++ }

  static parseEntity(buf: MBuffer) {
    let flags = buf.getFlags();
    const type = flags & this.ruleMask;
    flags = flags >>> this.ruleBitsize;
    let rule = this.rules.get(type);
    return rule.fromMYSON(buf, flags)
  }

  static addRule(rule: Rule) {
    if (this.rules.size > this.ruleSize) throw new Error('Rule size limit reached!');
    this.rules.set(rule.unique, rule);
  }
}

MYSON.updateRuleSize(16);