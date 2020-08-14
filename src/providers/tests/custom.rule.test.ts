import { Spec } from 'nole';
import { MYSON } from "../../myson";
import { inspect } from 'util'
import { MBuffer } from '../..';
import { MResult } from '../../utils/mresult';

class CustomType {
  fieldA: string
  fieldB: string

  constructor() { }
}

export class CustomTypeTest {
  @Spec()
  add_rule() {
    MYSON.addRule({
      unique: MYSON.nextUnique(),
      matchObject(data: any) {
        return data.constructor == CustomType;
      },
      toMYSON(data: CustomType) {
        return MResult.from(0, Buffer.concat([MYSON.binarify(data.fieldA), MYSON.binarify(data.fieldB)]));
      },
      fromMYSON(buf: MBuffer, flag: number): CustomType {
        const ct  = new CustomType();
        ct.fieldA = MYSON.parseEntity(buf);
        ct.fieldB = MYSON.parseEntity(buf);
        return ct;
      }
    });
  }

  @Spec()
  test_rule() {
    let myType = new CustomType();
    myType.fieldA = 'hello';
    myType.fieldB = 'world';

    let binary = MYSON.binarify(myType);
    console.log(JSON.stringify(myType).length, binary.length, binary);
    let result = MYSON.parse(binary);
    if (JSON.stringify(myType) != JSON.stringify(result)) {
      throw new Error('not expected! ' + inspect(result));
    }
  }
}