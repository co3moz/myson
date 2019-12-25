import { Spec } from 'nole';
import { MYSON } from '../..';

export class StringTest {
  @Spec()
  case1() {
    let binary = MYSON.binarify("hello");
    console.log(binary);
    if (MYSON.parse(binary) != "hello") {
      throw new Error('not expected!');
    }
  }
}