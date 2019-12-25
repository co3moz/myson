import { Spec } from 'nole';
import { MYSON } from "../../myson";
import { inspect } from 'util'
import { MBuffer } from '../..';

class CustomType {
  fieldA: string
  fieldB: string

  constructor() { }
}

export class CustomTypeTest {
  @Spec()
  manual_define() {
    MYSON.addRule({
      unique: MYSON.nextUnique(),
      matchObject(data: any) {
        return data.constructor == CustomType;
      },
      toMYSON(data: CustomType) {
        return MYSON.helpers.toMYSON(data, ['fieldA', 'fieldB']);
      },
      fromMYSON(buf: MBuffer): CustomType {
        return MYSON.helpers.fromMYSON(buf, ['fieldA', 'fieldB'], new CustomType());
      }
    });
    console.log('DEFINED')
  }

  @Spec()
  case1() {
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

  @Spec()
  helper() {
    class Person {
      name: string
      surname: string
      age: number
      isAvailable: boolean

      constructor() {}
    }

    MYSON.helpers.learn(Person, ['name', 'surname', 'age', 'isAvailable'])
    let data = Array(100).fill(0).map(x=> {
      let p = new Person();
      p.name = 'name'
      p.surname = 'surname'
      p.age = Math.random() * 100 | 0;
      p.isAvailable = Math.random() > 0.5;
      return p;
    })
    let binary = MYSON.binarify(data);
    console.log(JSON.stringify(data).length, binary.length, binary);
    let result = MYSON.parse(binary);
    if (JSON.stringify(data) != JSON.stringify(result)) {
      throw new Error('not expected! ' + inspect(result));
    }
  }

  
  @Spec()
  tree_of_objects() {
    class B {
      constructor(public is: number) {}
    }

    class A {
      constructor(public B: B) {}
    }

    MYSON.helpers.learn(B, ['is'])
    MYSON.helpers.learn(A, ['B'])

    let a = new A(new B(3));
    let binary = MYSON.binarify(a);
    console.log(JSON.stringify(a).length, binary.length, binary);
    let result = MYSON.parse(binary);
    if (JSON.stringify(a) != JSON.stringify(result)) {
      throw new Error('not expected! ' + inspect(result));
    }
  }
}