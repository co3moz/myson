import { CompatibleTupleConstructor, TUPLE_ID, TUPLE_FIELDS } from "./constructor";

export interface CustomTuple<T> {
  id: number
  klass: CompatibleTupleConstructor<T>
  fields: (keyof T)[]
}

const TUPLE_ID_MAP = new Map<number, CustomTuple<any>>();
const TUPLE_CONSTRUCTOR_MAP = new Map<CompatibleTupleConstructor<any>, CustomTuple<any>>();

export function learn<T>(tupleKlass: CompatibleTupleConstructor<T>) {
  const id = tupleKlass[TUPLE_ID];
  const fields = tupleKlass[TUPLE_FIELDS];
  if (id == undefined) throw new Error('Constructor symbol [MYSON_ID] is missing');
  if (fields == undefined) throw new Error('Constructor symbol [MYSON_FIELDS] is missing');

  if (TUPLE_ID_MAP.has(id)) throw new Error(`Custom id (${id}) is used for another custom class`);
  if (TUPLE_CONSTRUCTOR_MAP.has(tupleKlass)) throw new Error(`Each class should defined only once in custom class list`);

  const obj = { id, klass: tupleKlass, fields };
  TUPLE_ID_MAP.set(obj.id, obj);
  TUPLE_CONSTRUCTOR_MAP.set(obj.klass, obj);
}

export function FindById<T = any>(id: number): CustomTuple<T> | null {
  return TUPLE_ID_MAP.get(id);
}

export function FindByConstructor<T>(c: CompatibleTupleConstructor<T>): CustomTuple<T> | null {
  return TUPLE_CONSTRUCTOR_MAP.get(c);
}

export function HasByConstructor<T>(c: CompatibleTupleConstructor<T>): boolean {
  return TUPLE_CONSTRUCTOR_MAP.has(c);
}