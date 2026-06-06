// Block 08 — Exercises
// Run tests:  node --import tsx --test "blocks/08-streams/tests/*.test.ts"
import { Readable, Transform } from "node:stream";

// 1. Read every chunk of `source` into a single string.
export async function collect(source: Readable): Promise<string> {
  void source; // remove this line once you use the parameter
  // TODO: for await (const chunk of source) accumulate chunk.toString()
  throw new Error("Not implemented");
}

// 2. Return the total number of bytes that flow through `source`.
//    (Hint: Buffer.byteLength(chunk) counts a chunk's bytes.)
export async function countBytes(source: Readable): Promise<number> {
  void source; // remove this line once you use the parameter
  // TODO: sum Buffer.byteLength(chunk) over every chunk
  throw new Error("Not implemented");
}

// 3. Return a Transform stream that uppercases the text passing through it.
export function upperCase(): Transform {
  // TODO: return new Transform({ transform(chunk, _enc, cb) { ... } })
  throw new Error("Not implemented");
}
