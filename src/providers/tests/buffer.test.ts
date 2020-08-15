import { Spec } from 'nole';
import { assertAll } from '../../utils/assert';

export class BufferTest {
  @Spec()
  spec() {
    assertAll([
      Buffer.from([]),
      Buffer.from([1, 2, 3, 4, 5]),
      Buffer.from(Array(1000).fill(0)),
    ]);
  }
}