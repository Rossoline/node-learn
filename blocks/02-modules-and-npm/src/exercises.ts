// Block 02 — Exercises
// Run tests:  node --import tsx --test "blocks/02-modules-and-npm/tests/*.test.ts"
//
// Each task uses a `node:` built-in module. Add the imports you need at the top.

// 1. Return a random UUID. (Hint: import { randomUUID } from "node:crypto".)
export function uuid(): string {
  // TODO: return randomUUID()
  throw new Error("Not implemented");
}

// 2. Return the number of CPU cores. (Hint: node:os `cpus()` returns an array.)
export function cpuCount(): number {
  // TODO: return cpus().length
  throw new Error("Not implemented");
}

// 3. Return the current user's home directory. (Hint: node:os `homedir()`.)
export function homeDir(): string {
  // TODO: return homedir()
  throw new Error("Not implemented");
}
