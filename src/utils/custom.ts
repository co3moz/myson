import { Constructor } from "./constructor";

export interface CustomObject<T> {
  id: number
  klass: Constructor<T>
  fields: (keyof T)[]
}

const mapById = new Map<number, CustomObject<any>>();
const mapByConstructor = new Map<Constructor<any>, CustomObject<any>>();

export function learn<T>(id: number, klass: Constructor<T>, fields: (keyof T)[]) {
  if (mapById.has(id)) throw new Error(`Custom id (${id}) is used for another custom class`);
  if (mapByConstructor.has(klass)) throw new Error(`Each class should defined only once in custom class list`);

  const obj = { id, klass, fields };
  mapById.set(obj.id, obj);
  mapByConstructor.set(obj.klass, obj);
}

export function FindById<T = any>(id: number): CustomObject<T> {
  return mapById.get(id);
}

export function FindByConstructor<T>(c: Constructor<T>): CustomObject<T> {
  return mapByConstructor.get(c);
}

export function HasByConstructor<T>(c: Constructor<T>): boolean {
  return mapByConstructor.has(c);
}