import { Spec } from 'nole';
import { MYSON } from '../..';
import { TUPLE_ID, TUPLE_FIELDS } from '../../utils/constructor';
import { assertAll } from '../../utils/assert';
import { stdout } from 'process';

export class TupleTest {
  @Spec()
  spec() {
    class Car {
      type = 'car';
      constructor(public brand: string, public color: Color) { }

      static [TUPLE_ID] = 0
      static [TUPLE_FIELDS] = ['brand', 'color']
    }

    class Color {
      type = 'color';
      constructor(public tone: string) { }

      static [TUPLE_ID] = 1
      static [TUPLE_FIELDS] = ['tone']
    }

    class Red extends Color {
      type = 'red';
      constructor() {
        super('red');
      }
    }

    Red[TUPLE_ID] = 2;

    MYSON.tuple(Car);
    MYSON.tuple(Color);
    MYSON.tuple(Red);

    assertAll([
      new Car('toyota', new Red()),
      new Car('my crap car', new Color('blue')),
    ]);

    function old(data) { this.data = data; }

    old[TUPLE_ID] = 3;
    old[TUPLE_FIELDS] = ['data'];

    MYSON.tuple(old as any);

    assertAll([
      new old('data')
    ]);

  }
}