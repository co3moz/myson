import { Spec } from 'nole';
import { MYSON } from "../../myson";
import { MBuffer } from '../..';
import { MResult } from '../../utils/mresult';
import { assert } from '../../utils/assert';

class CustomType {
  fieldA: string
  fieldB: string

  constructor() { }
}

export class CustomTypeTest {
  @Spec()
  addRule() {
    MYSON.addRule({
      unique: 15,
      matchObject(data: any) {
        return data.constructor == CustomType;
      },
      toMYSON(data: CustomType) {
        return MResult.from(0, Buffer.concat([
          MYSON.binarify(data.fieldA),
          MYSON.binarify(data.fieldB)
        ]));
      },
      fromMYSON(buf: MBuffer, flag: number): CustomType {
        const ct = new CustomType();
        ct.fieldA = MYSON.parseEntity(buf);
        ct.fieldB = MYSON.parseEntity(buf);
        return ct;
      }
    });
  }

  @Spec()
  testType() {
    let myType = new CustomType();
    myType.fieldA = 'hello';
    myType.fieldB = 'world';

    assert(myType);
  }
}