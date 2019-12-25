import { Spec } from 'nole';
import { MYSON } from '../..';
import { inspect } from 'util'

export class ObjectTest {
  @Spec()
  case1() {
    let obj = { hello: "world" }
    let binary = MYSON.binarify(obj);
    console.log(binary);
    let result = MYSON.parse(binary);
    if (JSON.stringify(obj) != JSON.stringify(result)) {
      throw new Error('not expected! ' + inspect(result));
    }
  }
}