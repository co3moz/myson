import { MBuffer } from "./mbuffer";

const NEXT_FLAG = 0b1000_0000;
const DATA_FLAG = 0b0111_1111;
export function Flagger(value: number): Buffer {
  const arr = []

  for (; ;) {
    let segment = value & DATA_FLAG;
    value = value >>> 7;
    arr.unshift(segment);
    if (!value) {
      for (let i = 0; i < arr.length - 1; i++) {
        arr[i] |= NEXT_FLAG;
      }
      return Buffer.from(arr);
    }
  }
}

export function Deflagger(buffer: MBuffer) {
  let data = 0;
  for (; ;) {
    let segment = buffer.get();
    data <<= 7;
    if (segment & NEXT_FLAG) {
      data |= (segment & DATA_FLAG);
    } else {
      return data | segment;
    }
  }
}