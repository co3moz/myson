import { Spec } from 'nole';
import { Flagger, Deflagger } from './flagger';
import { MBuffer } from '..';
import { inspect } from 'util';

export class FlaggerTest {
  @Spec()
  case1() {
    this.test(1);
  }

  @Spec()
  case2() {
    this.test(20);
  }

  @Spec()
  case3() {
    this.test(256);
  }

  @Spec()
  case4() {
    this.test(125512);
  }

  test(n) {
    let z = Deflagger(MBuffer.from(Flagger(n)));
    if(z != n) throw new Error('not equal! ' + inspect(z) + ' != ' + inspect(n))
  }
}