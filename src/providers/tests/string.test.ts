import { Spec } from 'nole';
import { assertAll } from '../../utils/assert';

export class StringTest {
  @Spec()
  spec() {
    assertAll([
      '',
      'hello',
      'long'.repeat(1000)
    ]);
  }
}