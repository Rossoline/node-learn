// Block 07 — Exercises
// Run tests:  node --import tsx --test "blocks/07-writing-files/tests/*.test.ts"
//
// Use node:fs/promises. Add the imports you need at the top.

// 1. Write `data` to `path` as pretty-printed JSON (2-space indent).
export async function writeJson(path: string, data: unknown): Promise<void> {
  void path;
  void data; // remove these lines once you use the parameters
  // TODO: writeFile(path, JSON.stringify(data, null, 2))
  throw new Error("Not implemented");
}

// 2. Append `line` plus a trailing newline to `path` (creating it if missing).
export async function appendLine(path: string, line: string): Promise<void> {
  void path;
  void line; // remove these lines once you use the parameters
  // TODO: appendFile(path, line + "\n")
  throw new Error("Not implemented");
}

// 3. Write `contents` to `path` safely: write to `path + ".tmp"`, then rename to `path`.
export async function writeAtomic(path: string, contents: string): Promise<void> {
  void path;
  void contents; // remove these lines once you use the parameters
  // TODO: writeFile the .tmp file, then rename it onto path
  throw new Error("Not implemented");
}
