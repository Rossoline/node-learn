// Block 04 — Reference solutions
// Try the exercises yourself first! Read this only to check your work.

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

export function parseNumber(input: string): Promise<number> {
  return new Promise((resolve, reject) => {
    parseNumberCb(input, (err, value) => {
      if (err) reject(err);
      else resolve(value!); // value is defined when err is null
    });
  });
}

export function mapAsync<T, U>(
  items: T[],
  fn: (item: T) => Promise<U>,
): Promise<U[]> {
  return Promise.all(items.map(fn));
}

// Notes:
// - delay wraps the callback-based setTimeout into a promise so it can be awaited.
// - parseNumber is the manual "callback -> promise" pattern: reject on the error arg,
//   resolve otherwise. (node:util's `promisify` automates this for error-first APIs.)
// - mapAsync starts every fn call at once (parallel) and Promise.all preserves order.
