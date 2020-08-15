import { Spec } from 'nole';
import { assertAll } from '../../utils/assert';

export class ArrayTest {
  @Spec()
  spec() {
    assertAll([
      [],
      ["hello", "world!"],
      Array(100).fill(0),
      Array(1000).fill(0).map(() => "hello")
    ]);
  }
}