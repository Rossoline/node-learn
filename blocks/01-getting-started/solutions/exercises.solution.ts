// Block 01 — Reference solutions
// Try the exercises yourself first! Read this only to check your work.

export function greet(name: string): string {
  return `Hello from Node, ${name}!`;
}

export function parseArgs(argv: string[]): string[] {
  // The first two argv entries are always the node binary and the script path.
  return argv.slice(2);
}

export function getEnvOrDefault(key: string, fallback: string): string {
  // process.env[key] is string | undefined, so `??` supplies the fallback.
  return process.env[key] ?? fallback;
}

// Notes:
// - Node runs ordinary TypeScript; `greet` is just a typed function.
// - process.argv[0] is the node executable, [1] is the script — real args start at [2].
// - Environment variables are never guaranteed to exist; under noUncheckedIndexedAccess
//   the compiler forces you to handle the `undefined` case (here via `??`).
