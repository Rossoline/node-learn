// Block 06 — Exercises
// Run tests:  node --import tsx --test "blocks/06-reading-files/tests/*.test.ts"
//
// Use node:fs/promises. Add the imports you need at the top.

// 1. Read a UTF-8 text file and return its contents as a string.
export function readText(path: string): Promise<string> {
  void path; // remove this line once you use the parameter
  // TODO: return readFile(path, "utf8")
  throw new Error("Not implemented");
}

// 2. Return the directory's entry names, sorted alphabetically.
export async function listFiles(dir: string): Promise<string[]> {
  void dir; // remove this line once you use the parameter
  // TODO: read the directory, then sort the names
  throw new Error("Not implemented");
}

// 3. Read a file and JSON.parse it. The caller chooses the return type T.
export async function readJson<T = unknown>(path: string): Promise<T> {
  void path; // remove this line once you use the parameter
  // TODO: read the file as text, then JSON.parse it (as T)
  throw new Error("Not implemented");
}
