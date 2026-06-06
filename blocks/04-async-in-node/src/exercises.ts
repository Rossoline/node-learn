// Block 04 — Exercises
// Run tests:  node --import tsx --test "blocks/04-async-in-node/tests/*.test.ts"

// 1. Resolve after `ms` milliseconds. (Hint: wrap setTimeout in a new Promise.)
export function delay(ms: number): Promise<void> {
  void ms; // remove this line once you use the parameter
  // TODO: return new Promise((resolve) => setTimeout(resolve, ms))
  throw new Error("Not implemented");
}

// Given: a classic error-first callback API. Don't change this — wrap it below.
export function parseNumberCb(
  input: string,
  cb: (err: Error | null, value?: number) => void,
): void {
  const n = Number(input);
  if (input.trim() === "" || Number.isNaN(n)) {
    cb(new Error(`not a number: ${input}`));
  } else {
    cb(null, n);
  }
}

// 2. Wrap parseNumberCb in a promise: resolve the number, reject on error.
export function parseNumber(input: string): Promise<number> {
  void input; // remove this line once you use the parameter
  // TODO: return new Promise((resolve, reject) => parseNumberCb(input, (err, value) => ...))
  throw new Error("Not implemented");
}

// 3. Apply `fn` to every item in parallel; return results in the original order.
export function mapAsync<T, U>(
  items: T[],
  fn: (item: T) => Promise<U>,
): Promise<U[]> {
  void items;
  void fn; // remove these lines once you use the parameters
  // TODO: return Promise.all(items.map(fn))
  throw new Error("Not implemented");
}
