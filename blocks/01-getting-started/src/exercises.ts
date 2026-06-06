// Block 01 — Exercises
// Run tests:  node --import tsx --test "blocks/01-getting-started/tests/*.test.ts"

// 1. Return a greeting like "Hello from Node, Ada!"
export function greet(name: string): string {
  void name; // remove this line once you use the parameter
  // TODO: return `Hello from Node, ${name}!`
  throw new Error("Not implemented");
}

// 2. Given a process.argv-style array, return only the user arguments
//    (everything after the first two entries: the node binary and the script path).
export function parseArgs(argv: string[]): string[] {
  void argv; // remove this line once you use the parameter
  // TODO: return argv.slice(2)
  throw new Error("Not implemented");
}

// 3. Return process.env[key] if it is set, otherwise return `fallback`.
//    (Reading process.env[key] gives string | undefined.)
export function getEnvOrDefault(key: string, fallback: string): string {
  void key;
  void fallback; // remove these lines once you use the parameters
  // TODO: return the env value if present, else the fallback
  throw new Error("Not implemented");
}
