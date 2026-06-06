// Block 10 — Reference solutions
// Try the exercises yourself first! Read this only to check your work.

export function toBase64(text: string): string {
  return Buffer.from(text, "utf8").toString("base64");
}

export function fromBase64(b64: string): string {
  return Buffer.from(b64, "base64").toString("utf8");
}

export function byteLength(text: string): number {
  return Buffer.byteLength(text, "utf8");
}

// Notes:
// - Buffer.from(text, "utf8") turns a string into bytes; .toString(encoding) turns bytes
//   back into a string under that encoding.
// - base64 encode/decode are inverse: fromBase64(toBase64(x)) === x.
// - Buffer.byteLength counts bytes, which exceeds string length for multi-byte characters
//   (e.g. "é" is one character but two UTF-8 bytes).
