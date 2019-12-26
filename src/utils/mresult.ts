import { Flagger } from "./flagger";
import { Rule } from "./rule";
import { MYSON } from "../myson";

export class MResult {
  private constructor(public flags: number, public buf: Buffer) { }
  static from(flags: number, buf?: Buffer) {
    return new MResult(flags | 0, buf);
  }

  finish(rule: Rule) {
    let flagBuf = Flagger(rule.unique + (this.flags << 4));

    if (this.buf) {
      return Buffer.concat([flagBuf, this.buf]);
    }

    return flagBuf
  }
}