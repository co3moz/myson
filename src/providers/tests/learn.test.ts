import { Spec } from 'nole';
import { MYSON } from '../..';
import { inspect } from 'util';

export class CollectionTest {
  @Spec()
  case1() {
    class Car {
      constructor(public brand: string, public color: Color) { }
    }

    class Color {
      constructor(public tone: string) { }
    }

    class Red extends Color {
      constructor() {
        super('red');
      }
    }

    MYSON.learn(0, Car, ['brand', 'color']);
    MYSON.learn(1, Color, ['tone']);
    MYSON.learn(2, Red, ['tone']);

    let data = new Car('toyota', new Red());
    let binary = MYSON.binarify(data);
    console.log(JSON.stringify(data).length, binary.length, binary);
    let result = MYSON.parse(binary);
    if (JSON.stringify(data) != JSON.stringify(result)) {
      throw new Error('not expected! ' + inspect(result));
    }
  }
}