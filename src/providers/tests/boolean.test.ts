import { Spec } from 'nole';
import { assertAll } from '../../utils/assert';

export class BooleanTest {
  @Spec()
  spec() {
    assertAll([
      true,
      false
    ]);
  }
}