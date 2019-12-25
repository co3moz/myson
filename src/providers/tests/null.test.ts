import { Spec } from 'nole';
import { MYSON } from '../..';

export class NullTest {
  @Spec()
  case1() {
    let binary = MYSON.binarify(null);
    console.log(binary);
    if (MYSON.parse(binary) !== null) {
      throw new Error('not expected!');
    }
  }

  @Spec()
  case2() {
    let binary = MYSON.binarify(undefined);
    console.log(binary);
    if (MYSON.parse(binary) !== undefined) {
      throw new Error('not expected!');
    }
  }
}