// Block 08 — Streams: worked examples
// Run me:  npm run play blocks/08-streams/src/examples.ts
export {}; // make this a module so top-level names don't clash across blocks

import { Readable, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

// Read a Readable to a string.
async function collect(source: Readable): Promise<string> {
  let out = "";
  for await (const chunk of source) out += chunk.toString();
  return out;
}

// A Transform that uppercases.
const upper = new Transform({
  transform(chunk, _enc, cb) {
    cb(null, chunk.toString().toUpperCase());
  },
});

async function main() {
  console.log("collect:", await collect(Readable.from(["Hello, ", "world"])));

  // Pipe a source through a transform into a collecting array.
  const chunks: string[] = [];
  await pipeline(Readable.from(["aB", "cD"]), upper, async function (src) {
    for await (const c of src) chunks.push(c.toString());
  });
  console.log("piped + upper:", chunks.join(""));
}

void main();
