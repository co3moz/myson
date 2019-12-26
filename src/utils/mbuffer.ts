import { Deflagger } from "./flagger";

export class MBuffer {
  public index: number = 0;
  private constructor(public buf: Buffer) { }
  static from(buf: Buffer) {
    return new MBuffer(buf);
  }

  get(): number {
    return this.buf.readUInt8(this.index++);
  }

  slice(length: number): Buffer {
    return this.buf.slice(this.index, this.index += length);
  }

  getRelative(relative: number): number {
    return this.buf.readUInt8(this.index + relative);
  }

  deflag(): number {
    return Deflagger(this);
  }
}