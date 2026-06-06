// Block 05 — Reference solutions
// Try the exercises yourself first! Read this only to check your work.

export type Result<T> = { ok: true; value: T } | { ok: false; error: Error };

export class AppError extends Error {
  constructor(
    message: string,
    public readonly exitCode: number,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function tryCatch<T>(fn: () => T): Result<T> {
  try {
    return { ok: true, value: fn() };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}

export function exitCodeFor(error: unknown): number {
  return error instanceof AppError ? error.exitCode : 1;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "unknown error";
}

// Notes:
// - tryCatch converts a throwing function into a Result; normalizing non-Error throws
//   (someone can `throw "boom"`) keeps the error branch's type honest.
// - AppError carries the exit code, so a CLI can do `process.exitCode = exitCodeFor(e)`.
// - getErrorMessage must narrow `unknown` before touching `.message`.
