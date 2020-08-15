import { Spec } from 'nole';
import { assertAll } from '../../utils/assert';

export class NullTest {
  @Spec()
  spec() {
    assertAll([
      null,
      undefined
    ]);
  }
}