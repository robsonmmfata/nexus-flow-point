// Minimal ESC/POS builder for POS-80 printers
// Supports: init, align, bold, text, feed, cut, separator, kv pairs

const encoder = new TextEncoder();

type Align = "left" | "center" | "right";

export class EscPosBuilder {
  private chunks: Uint8Array[] = [];

  private pushBytes(...bytes: number[]) {
    this.chunks.push(new Uint8Array(bytes));
  }

  init() {
    // Initialize
    this.pushBytes(0x1b, 0x40);
    return this;
  }

  align(mode: Align) {
    const n = mode === "left" ? 0 : mode === "center" ? 1 : 2;
    this.pushBytes(0x1b, 0x61, n);
    return this;
  }

  bold(on: boolean) {
    this.pushBytes(0x1b, 0x45, on ? 1 : 0);
    return this;
  }

  text(s: string) {
    this.chunks.push(encoder.encode(s));
    return this;
  }

  ln(s: string = "") {
    if (s) this.text(s);
    this.pushBytes(0x0a);
    return this;
  }

  feed(n = 1) {
    this.pushBytes(0x1b, 0x64, Math.max(0, Math.min(255, n)));
    return this;
  }

  separator(char = "-", width = 48) {
    const line = char.repeat(width);
    return this.ln(line);
  }

  kv(key: string, value: string, width = 42) {
    const k = key.trim();
    const v = value.trim();
    const space = Math.max(1, width - (k.length + v.length));
    return this.ln(`${k}${" ".repeat(space)}${v}`);
  }

  cut(partial = true) {
    // Partial cut
    this.pushBytes(0x1d, 0x56, partial ? 0x42 : 0x41, 0x00);
    return this;
  }

  build() {
    // Concatenate all chunks
    const total = this.chunks.reduce((s, a) => s + a.length, 0);
    const out = new Uint8Array(total);
    let o = 0;
    for (const c of this.chunks) {
      out.set(c, o);
      o += c.length;
    }
    return out;
  }
}
