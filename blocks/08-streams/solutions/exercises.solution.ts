// Block 08 — Reference solutions
// Try the exercises yourself first! Read this only to check your work.
import { Readable, Transform } from "node:stream";

export async function collect(source: Readable): Promise<string> {
  let out = "";
  for await (const chunk of source) {
    out += chunk.toString();
  }
  return out;
}

export async function countBytes(source: Readable): Promise<number> {
  let total = 0;
  for await (const chunk of source) {
    total += Buffer.byteLength(chunk);
  }
  return total;
}

export function upperCase(): Transform {
  return new Transform({
    transform(chunk, _enc, cb) {
      // Push the transformed chunk by passing it as the callback's second arg.
      cb(null, chunk.toString().toUpperCase());
    },
  });
}

// Notes:
// - A Readable is async-iterable; `for await` pulls chunks with backpressure handled.
// - Chunks are Buffers (or strings); Buffer.byteLength measures the real byte size,
//   which differs from string length for multi-byte characters.
// - A Transform calls cb(null, output) per chunk; errors go through cb(err).
