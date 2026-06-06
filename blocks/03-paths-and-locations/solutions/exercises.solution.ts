// Block 03 — Reference solutions
// Try the exercises yourself first! Read this only to check your work.
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export function joinPath(...segments: string[]): string {
  return join(...segments);
}

export function fileExtension(filename: string): string {
  return extname(filename);
}

export function currentDir(fileUrl: string): string {
  // import.meta.url is a file:// URL; convert to an OS path, then take its directory.
  return dirname(fileURLToPath(fileUrl));
}

// Notes:
// - `join` uses the platform separator and normalizes "." / ".." — never build paths
//   with string concatenation.
// - `extname` returns the last ".xxx" (so "a.tar.gz" -> ".gz") or "" when there is none.
// - ES modules have no __dirname; `fileURLToPath(import.meta.url)` is the portable way to
//   get this file's path, and `dirname` gives the folder it lives in.
