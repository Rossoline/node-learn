// Block 04 — Async in Node: worked examples
// Run me:  npm run play blocks/04-async-in-node/src/examples.ts
export {}; // make this a module so top-level names don't clash across blocks

import { promisify } from "node:util";

// A typed delay built from setTimeout.
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// An error-first callback API...
function addCb(
  a: number,
  b: number,
  cb: (err: Error | null, sum?: number) => void,
): void {
  cb(null, a + b);
}
// ...promisified.
const addAsync = promisify(addCb);

async function main() {
  // Microtasks run before timers.
  setTimeout(() => console.log("3) timeout"), 0);
  Promise.resolve().then(() => console.log("2) promise microtask"));
  console.log("1) sync");

  await delay(10);
  console.log("4) after 10ms");

  console.log("addAsync(2,3):", await addAsync(2, 3));

  // Parallel.
  const results = await Promise.all([delay(5).then(() => "a"), Promise.resolve("b")]);
  console.log("parallel:", results);
}

void main();
