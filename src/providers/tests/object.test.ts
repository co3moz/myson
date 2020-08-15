import { Spec } from 'nole';
import { assertAll } from '../../utils/assert';

export class ObjectTest {
  @Spec()
  spec() {
    assertAll([
      {},
      { hello: "world" },
      { "hello world": true },
      { "multiple": 1, "keys": 2 },
      Array(1000).fill(0).reduce((x, i) => {
        x[i] = 'lots of keys';
        return x;
      }, {})
    ]);
  }
}