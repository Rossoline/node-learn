// Block 03 — Exercises
// Run tests:  node --import tsx --test "blocks/03-paths-and-locations/tests/*.test.ts"
//
// Use node:path / node:url. Add the imports you need at the top.

// 1. Join path segments portably (the right separator for this OS).
export function joinPath(...segments: string[]): string {
  void segments; // remove this line once you use the parameter
  // TODO: return join(...segments)
  throw new Error("Not implemented");
}

// 2. Return a file's extension, including the leading dot ("" if none).
//    e.g. "archive.tar.gz" -> ".gz", "README" -> ""
export function fileExtension(filename: string): string {
  void filename; // remove this line once you use the parameter
  // TODO: return extname(filename)
  throw new Error("Not implemented");
}

// 3. Given a file:// URL (like import.meta.url), return the directory containing it.
//    Convert the URL to a path first, then take its dirname.
export function currentDir(fileUrl: string): string {
  void fileUrl; // remove this line once you use the parameter
  // TODO: return dirname(fileURLToPath(fileUrl))
  throw new Error("Not implemented");
}
