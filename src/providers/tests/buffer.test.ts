import { Spec } from 'nole';
import { MYSON } from '../..';

export class BufferTest {
  @Spec()
  case1() {
    let binary = MYSON.binarify(Buffer.from([1, 2, 3, 4, 5]));
    console.log(binary);
    if (MYSON.parse(binary).compare(Buffer.from([1, 2, 3, 4, 5])) != 0) {
      throw new Error('not expected!');
    }
  }
}