import { Spec } from 'nole';
import { MYSON } from '../..';

export class ArrayTest {
  @Spec()
  case1() {
    let binary = MYSON.binarify([]);
    console.log(binary);
    if (MYSON.parse(binary).length != 0) {
      throw new Error('not expected!');
    }
  }

  @Spec()
  case2() {
    let binary = MYSON.binarify(["hello", "world!"]);
    console.log(binary);
    if (MYSON.parse(binary).length != 2) {
      throw new Error('not expected!');
    }
  }

  @Spec()
  case3_big_array() {
    let binary = MYSON.binarify(Array(100).fill(0));
    console.log(binary);
    if (MYSON.parse(binary).length != 100) {
      throw new Error('not expected!');
    }
  }

  @Spec()
  case4_big_array() {
    let obj = Array(1000).fill(0).map(x=> "hello");
    let binary = MYSON.binarify(obj);
    console.log(JSON.stringify(obj).length, binary.length, binary);
    if (MYSON.parse(binary).length != 1000) {
      throw new Error('not expected!');
    }
  }
}