// Block 07 — Writing Files: worked examples
// Run me:  npm run play blocks/07-writing-files/src/examples.ts
export {}; // make this a module so top-level names don't clash across blocks

import { mkdtemp, writeFile, appendFile, mkdir, rm, readFile, rename } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

async function main() {
  // Work inside a throwaway temp directory.
  const dir = await mkdtemp(join(tmpdir(), "node-learn-demo-"));
  try {
    // Write (overwrite) and append.
    await writeFile(join(dir, "out.txt"), "first\n");
    await appendFile(join(dir, "out.txt"), "second\n");
    console.log("out.txt:", JSON.stringify(await readFile(join(dir, "out.txt"), "utf8")));

    // Pretty JSON.
    await writeFile(join(dir, "config.json"), JSON.stringify({ a: 1 }, null, 2));
    console.log("config.json:\n" + (await readFile(join(dir, "config.json"), "utf8")));

    // Nested dirs.
    await mkdir(join(dir, "deep", "nested"), { recursive: true });

    // Atomic-ish write.
    await writeFile(join(dir, "data.json.tmp"), '{"done":true}');
    await rename(join(dir, "data.json.tmp"), join(dir, "data.json"));
    console.log("data.json:", await readFile(join(dir, "data.json"), "utf8"));
  } finally {
    await rm(dir, { recursive: true, force: true });
    console.log("cleaned up", dir);
  }
}

void main();
