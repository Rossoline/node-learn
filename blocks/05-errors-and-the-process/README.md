# Block 05 — Errors & the Process

**English** · [Українська](./README.uk.md)

How Node programs fail well: typed error handling, custom error classes, and exiting with
the right **exit code** so other tools can react.

## Caught errors are `unknown`

Under `strict`, the variable in a `catch` is `unknown` — anything can be thrown. Narrow
before using it:

```ts
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "unknown error";
}
```

## Custom error classes

Subclass `Error` to attach context (here, the exit code a CLI should use):

```ts
class AppError extends Error {
  constructor(
    message: string,
    public readonly exitCode: number,
  ) {
    super(message);
    this.name = "AppError";
  }
}
```

## Returning failure instead of throwing

A `Result` makes failure part of the value, so callers must handle it:

```ts
type Result<T> = { ok: true; value: T } | { ok: false; error: Error };
```

## The process & exit codes

A Node process ends with an **exit code**: `0` means success, anything else means failure.
Prefer setting `process.exitCode` and letting the program finish over `process.exit()`,
which kills it immediately (possibly cutting off pending I/O):

```ts
process.exitCode = 1;        // preferred: graceful
// process.exit(1);          // abrupt — only when you truly must stop now
```

As a safety net you can observe crashes globally (use sparingly — fix the root cause):

```ts
process.on("uncaughtException", (err) => {
  console.error("fatal:", err);
  process.exit(1);
});
```

---

## Exercises

Open [`src/exercises.ts`](./src/exercises.ts) and implement each `// TODO`. Then run:

```bash
node --import tsx --test "blocks/05-errors-and-the-process/tests/*.test.ts"
```

1. `tryCatch(fn)` — run a sync function and return a `Result<T>`: `{ ok: true, value }`
   on success, `{ ok: false, error }` (normalized to an `Error`) on throw.
2. `exitCodeFor(error)` — return an `AppError`'s `exitCode`, or `1` for any other error.
3. `getErrorMessage(error)` — narrow an `unknown` error to a readable message.

Then compare with [`solutions/`](./solutions).
