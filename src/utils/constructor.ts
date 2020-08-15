export const TUPLE_ID = Symbol();
export const TUPLE_FIELDS = Symbol();

export interface CompatibleTupleConstructor<T> {
  new(...args: any[]): T;

  [TUPLE_ID]: number
  [TUPLE_FIELDS]: string[]
}
