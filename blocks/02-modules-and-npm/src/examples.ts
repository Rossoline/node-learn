// Block 02 — Modules & npm: worked examples
// Run me:  npm run play blocks/02-modules-and-npm/src/examples.ts
export {}; // make this a module so top-level names don't clash across blocks

// Importing built-in modules with the `node:` specifier.
import { randomUUID } from "node:crypto";
import { cpus, homedir, platform } from "node:os";

console.log("a random id:", randomUUID());
console.log("cpu cores:", cpus().length);
console.log("home dir:", homedir());
console.log("platform:", platform());

// Named vs default exports (inline demo of the shapes you'd put in separate files).
function add(a: number, b: number): number {
  return a + b;
}
console.log("add(2, 3):", add(2, 3));

// In another file you might write:
//   export default function main() { ... }   // imported as: import main from "./x.ts"
//   export function add(...) { ... }          // imported as: import { add } from "./x.ts"
