// Block 17 — Exercises
// Run tests:  node --import tsx --test "blocks/17-cli-tools/tests/*.test.ts"
import type { Readable } from "node:stream";

export type Flags = { name: string; verbose: boolean; count: number };

// 1. Parse argv-style flags with node:util's parseArgs.
//    --name <string>  (default "world")
//    --verbose        (boolean, default false)
//    --count <number> (default 1; parseArgs gives a string, convert it)
export function parseFlags(args: string[]): Flags {
  void args; // remove this line once you use the parameter
  // TODO: parseArgs({ args, options: {...} }), then map values -> Flags
  throw new Error("Not implemented");
}

// 2. Collect a Readable stream (like process.stdin) into a single string.
export async function readInput(stream: Readable): Promise<string> {
  void stream; // remove this line once you use the parameter
  // TODO: for await (const chunk of stream) accumulate chunk
  throw new Error("Not implemented");
}

// 3. Return `count` lines of "Hello, <name>!" joined by newlines ("" when count is 0).
export function repeatGreeting(name: string, count: number): string {
  void name;
  void count; // remove these lines once you use the parameters
  // TODO: build `count` greeting lines and join with "\n"
  throw new Error("Not implemented");
}
