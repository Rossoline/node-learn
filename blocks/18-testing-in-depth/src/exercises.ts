// Block 18 — Exercises
// Run tests:  node --import tsx --test "blocks/18-testing-in-depth/tests/*.test.ts"

// 1. Build a greeting using the injected `getName` (so a test can mock it).
export function greetUser(id: number, getName: (id: number) => string): string {
  void id;
  void getName; // remove these lines once you use the parameters
  // TODO: return `Hello, ${getName(id)}!`
  throw new Error("Not implemented");
}

// 2. Parse a strictly-positive number. Throw Error("not a positive number") for
//    anything that isn't (zero, negatives, non-numeric, empty).
export function parsePositive(input: string): number {
  void input; // remove this line once you use the parameter
  // TODO: Number(input); validate > 0 and finite, else throw
  throw new Error("Not implemented");
}

// 3. Await the async `load` twice and return the sum of the two results.
export async function sumTwice(load: () => Promise<number>): Promise<number> {
  void load; // remove this line once you use the parameter
  // TODO: const a = await load(); const b = await load(); return a + b;
  throw new Error("Not implemented");
}
