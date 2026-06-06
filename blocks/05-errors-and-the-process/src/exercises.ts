// Block 05 — Exercises
// Run tests:  node --import tsx --test "blocks/05-errors-and-the-process/tests/*.test.ts"

export type Result<T> = { ok: true; value: T } | { ok: false; error: Error };

// A custom error that carries the exit code a CLI should use.
export class AppError extends Error {
  constructor(
    message: string,
    public readonly exitCode: number,
  ) {
    super(message);
    this.name = "AppError";
  }
}

// 1. Run `fn`. Return { ok: true, value } on success, or { ok: false, error } on throw.
//    Normalize a non-Error throw into an Error.
export function tryCatch<T>(fn: () => T): Result<T> {
  void fn; // remove this line once you use the parameter
  // TODO: try { return ok } catch (e) { return err normalized to Error }
  throw new Error("Not implemented");
}

// 2. Map an error to a process exit code: an AppError's exitCode, else 1.
export function exitCodeFor(error: unknown): number {
  void error; // remove this line once you use the parameter
  // TODO: if error is an AppError return its exitCode, otherwise 1
  throw new Error("Not implemented");
}

// 3. Turn an unknown caught error into a readable message.
export function getErrorMessage(error: unknown): string {
  void error; // remove this line once you use the parameter
  // TODO: Error -> .message, string -> itself, else "unknown error"
  throw new Error("Not implemented");
}
