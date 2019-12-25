import { Spec } from 'nole';
import { MYSON } from '../..';
import {inspect} from 'util'

export class NumberTest {
  @Spec()
  case1() {
    let binary = MYSON.binarify(1);
    console.log(binary);
    if (MYSON.parse(binary) != 1) {
      throw new Error('not expected!');
    }
  }

  @Spec()
  case2() {
    let binary = MYSON.binarify(15);
    console.log(binary);
    let result = MYSON.parse(binary);
    if (result != 15) {
      throw new Error('not expected! ' + inspect(result));
    }
  }

  @Spec()
  case3() {
    let binary = MYSON.binarify(11245);
    console.log(binary);
    let result = MYSON.parse(binary);
    if (result != 11245) {
      throw new Error('not expected! ' + inspect(result));
    }
  }

  @Spec()
  case4() {
    let binary = MYSON.binarify(1112351235.245);
    console.log(binary);
    if (MYSON.parse(binary) != 1112351235.245) {
      throw new Error('not expected!');
    }
  }
}