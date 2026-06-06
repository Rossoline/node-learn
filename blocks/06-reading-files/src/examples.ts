// Block 06 — Reading Files: worked examples
// Run me:  npm run play blocks/06-reading-files/src/examples.ts
export {}; // make this a module so top-level names don't clash across blocks

import { readFile, readdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const fixtures = join(here, "..", "fixtures");

async function main() {
  // Read text.
  const hello = await readFile(join(fixtures, "hello.txt"), "utf8");
  console.log("hello.txt:", JSON.stringify(hello));

  // Read + parse JSON.
  const raw = await readFile(join(fixtures, "data.json"), "utf8");
  const data = JSON.parse(raw) as { name: string; version: number };
  console.log("data.json name:", data.name, "version:", data.version);

  // List a directory.
  console.log("fixtures:", (await readdir(fixtures)).sort());

  // Inspect a file.
  const info = await stat(join(fixtures, "data.json"));
  console.log("data.json isFile:", info.isFile(), "size:", info.size);

  // Missing files reject — handle it.
  try {
    await readFile(join(fixtures, "nope.txt"), "utf8");
  } catch (err) {
    console.log("missing file:", (err as NodeJS.ErrnoException).code); // "ENOENT"
  }
}

void main();
