import { Spec } from 'nole';
import { assert } from '../../utils/assert';
import { TupleArray } from '../tuple-array';
import { stdout } from 'process';
import { MYSON } from '../../myson';
import { NumberSerializationOptions } from '../../utils/rule';

export class TupleArrayTest {
  @Spec()
  spec() {
    const array = Array(1000).fill(0).map((_, i) => ({ id: i, _ignored: 1 }));
    const tupleArray = TupleArray.from(array, ['id']);
    assert(tupleArray, Array(1000).fill(0).map((_, i) => ({ id: i })));
  }
}