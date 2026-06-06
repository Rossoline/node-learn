// Block 07 — Reference solutions
// Try the exercises yourself first! Read this only to check your work.
import { writeFile, appendFile, rename } from "node:fs/promises";

export async function writeJson(path: string, data: unknown): Promise<void> {
  // null, 2 -> pretty-printed with a 2-space indent.
  await writeFile(path, JSON.stringify(data, null, 2));
}

export async function appendLine(path: string, line: string): Promise<void> {
  await appendFile(path, line + "\n");
}

export async function writeAtomic(path: string, contents: string): Promise<void> {
  const tmp = path + ".tmp";
  await writeFile(tmp, contents);
  await rename(tmp, path); // atomic on the same filesystem
}

// Notes:
// - writeFile creates or overwrites; appendFile adds to the end (and creates if needed).
// - JSON.stringify(data, null, 2) is the standard "pretty JSON" call.
// - writeAtomic avoids leaving a half-written file: a crash mid-write only damages the
//   .tmp file, and the rename swaps in the complete file in one step.
