import { Spec } from 'nole';
import { MYSON } from '../..';

export class BooleanTest {
  @Spec()
  case1() {
    let binary = MYSON.binarify(true);
    console.log(binary);
    if (MYSON.parse(binary) != true) {
      throw new Error('not expected!');
    }
  }
}