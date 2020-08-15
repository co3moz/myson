import { inspect } from 'util';
import { MYSON } from "../myson";
import { SerializationOptions } from './rule';

export const assert = (check: any, match?: any, options?: SerializationOptions) => {
  const result = MYSON.parse(MYSON.binarify(check, options));

  if (check != null) {
    if (JSON.stringify(match ?? check) != JSON.stringify(result)) {
      throw new Error('not equal! ' + inspect(check) + ' != ' + inspect(result))
    }
  } else {
    if ((check === null && result !== null) || (check === undefined && result !== undefined)) {
      throw new Error('not equal! ' + inspect(check) + ' != ' + inspect(result));
    }
  }
}

export const assertAll = (check: any[], options?: SerializationOptions) => {
  for (const item of check) {
    assert(item, undefined, options);
  }
}