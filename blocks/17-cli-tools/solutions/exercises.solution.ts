// Block 17 — Reference solutions
// Try the exercises yourself first! Read this only to check your work.
import { parseArgs } from "node:util";
import type { Readable } from "node:stream";

export type Flags = { name: string; verbose: boolean; count: number };

export function parseFlags(args: string[]): Flags {
  const { values } = parseArgs({
    args,
    options: {
      name: { type: "string", default: "world" },
      verbose: { type: "boolean", default: false },
      count: { type: "string", default: "1" },
    },
  });
  return {
    name: values.name ?? "world",
    verbose: values.verbose ?? false,
    count: Number(values.count ?? "1"),
  };
}

export async function readInput(stream: Readable): Promise<string> {
  let data = "";
  for await (const chunk of stream) {
    data += chunk;
  }
  return data;
}

export function repeatGreeting(name: string, count: number): string {
  return Array.from({ length: count }, () => `Hello, ${name}!`).join("\n");
}

// Notes:
// - parseArgs only yields string/boolean values, so `count` is parsed from a string.
//   The `?? default` keeps the types non-optional even though parseArgs widens them.
// - readInput is the same stream-collection pattern as block 08, applied to stdin.
// - repeatGreeting joins with "\n" so 0 lines -> "" and N lines have N-1 separators.
