// Capstone — Result type and constructors.
export type Result<T, E = string> =
  | { ok: true; value: T }
  | { ok: false; error: E };

// 1a. Build a success result.
export function ok<T>(value: T): Result<T, never> {
  void value; // remove this line once you use the parameter
  // TODO: return { ok: true, value }
  throw new Error("Not implemented");
}

// 1b. Build a failure result.
export function err<E>(error: E): Result<never, E> {
  void error; // remove this line once you use the parameter
  // TODO: return { ok: false, error }
  throw new Error("Not implemented");
}
