// Block 10 — Exercises
// Run tests:  node --import tsx --test "blocks/10-buffers-and-encoding/tests/*.test.ts"

// 1. Encode a UTF-8 string to base64.
export function toBase64(text: string): string {
  void text; // remove this line once you use the parameter
  // TODO: Buffer.from(text, "utf8").toString("base64")
  throw new Error("Not implemented");
}

// 2. Decode a base64 string back to UTF-8 text.
export function fromBase64(b64: string): string {
  void b64; // remove this line once you use the parameter
  // TODO: Buffer.from(b64, "base64").toString("utf8")
  throw new Error("Not implemented");
}

// 3. Return how many BYTES a UTF-8 string occupies (not its character length).
export function byteLength(text: string): number {
  void text; // remove this line once you use the parameter
  // TODO: Buffer.byteLength(text, "utf8")
  throw new Error("Not implemented");
}
