// Block 18 — Reference solutions
// Try the exercises yourself first! Read this only to check your work.

export function greetUser(id: number, getName: (id: number) => string): string {
  return `Hello, ${getName(id)}!`;
}

export function parsePositive(input: string): number {
  const n = Number(input);
  if (!Number.isFinite(n) || n <= 0) {
    throw new Error("not a positive number");
  }
  return n;
}

export async function sumTwice(load: () => Promise<number>): Promise<number> {
  const a = await load();
  const b = await load();
  return a + b;
}

// Notes:
// - greetUser takes getName as a parameter (dependency injection): a test can pass a
//   mock.fn and assert how it was called, without any real lookup.
// - parsePositive throws for invalid input so tests can use assert.throws; Number("")
//   is 0, which correctly fails the > 0 check.
// - sumTwice awaits load() twice; a spy can confirm it was called exactly twice.
