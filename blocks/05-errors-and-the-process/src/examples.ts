// Block 05 — Errors & the Process: worked examples
// Run me:  npm run play blocks/05-errors-and-the-process/src/examples.ts
export {}; // make this a module so top-level names don't clash across blocks

// Custom error carrying an exit code.
class AppError extends Error {
  constructor(
    message: string,
    public readonly exitCode: number,
  ) {
    super(message);
    this.name = "AppError";
  }
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "unknown error";
}

try {
  throw new AppError("config missing", 2);
} catch (err) {
  console.log("message:", getErrorMessage(err));
  if (err instanceof AppError) console.log("exit code would be:", err.exitCode);
}

// Result instead of throwing.
type Result<T> = { ok: true; value: T } | { ok: false; error: Error };
function parse(json: string): Result<unknown> {
  try {
    return { ok: true, value: JSON.parse(json) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e : new Error(String(e)) };
  }
}
console.log(parse('{"a":1}'));
console.log(parse("oops"));

// Set the exit code gracefully (this run still exits 0 since we don't fail).
console.log("current exitCode:", process.exitCode ?? 0);
