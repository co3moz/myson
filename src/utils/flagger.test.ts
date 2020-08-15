import { Spec } from 'nole';
import { Flagger, Deflagger } from './flagger';
import { MBuffer } from '..';
import { inspect } from 'util';

export class FlaggerTest {
  @Spec()
  spec() {
    [1, 20, 256, 125512, 2034969342].forEach(n => {
      let z = Deflagger(MBuffer.from(Flagger(n)));
      if (z != n) throw new Error('not equal! ' + inspect(z) + ' != ' + inspect(n))
    });
  }
}