// Block 06 — Reference solutions
// Try the exercises yourself first! Read this only to check your work.
import { readFile, readdir } from "node:fs/promises";

export function readText(path: string): Promise<string> {
  // Passing "utf8" returns a string (without it you'd get a Buffer).
  return readFile(path, "utf8");
}

export async function listFiles(dir: string): Promise<string[]> {
  const names = await readdir(dir);
  return names.sort();
}

export async function readJson<T = unknown>(path: string): Promise<T> {
  const raw = await readFile(path, "utf8");
  return JSON.parse(raw) as T;
}

// Notes:
// - node:fs/promises lets you `await` instead of using callbacks.
// - readdir returns entry NAMES only; sort() makes the order deterministic.
// - readJson is just readFile + JSON.parse; the generic T lets callers name the shape.
//   (It does not validate — for untrusted input you'd check the parsed value.)
