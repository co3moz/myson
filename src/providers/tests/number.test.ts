import { Spec } from 'nole';
import { assertAll } from '../../utils/assert';
import { NumberSerializationOptions } from '../../utils/rule';

export class NumberTest {
  testData = [
    1,
    15,
    11245,
    1112351235.245
  ];

  @Spec()
  spec() {
    assertAll(this.testData);
  }

  @Spec()
  noFlagger() {
    assertAll(this.testData, { numbers: NumberSerializationOptions.noFlagger });
  }
  
  @Spec()
  alwaysDouble() {
    assertAll(this.testData, { numbers: NumberSerializationOptions.alwaysDouble });
  }
  
}