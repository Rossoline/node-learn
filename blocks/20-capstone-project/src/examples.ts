// Block 20 — Capstone: a quick tour once you've implemented the modules.
// Run me (after solving):  npm run play blocks/20-capstone-project/src/examples.ts
export {}; // make this a module

import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { TaskStore } from "./store.ts";
import { runCli } from "./cli.ts";

async function main() {
  const dir = await mkdtemp(join(tmpdir(), "node-learn-20-"));
  try {
    const store = new TaskStore(join(dir, "tasks.json"));
    console.log((await runCli(store, ["add", "Buy milk"])).output);
    console.log((await runCli(store, ["add", "Write README"])).output);
    console.log((await runCli(store, ["done", "1"])).output);
    console.log("--- list ---");
    console.log((await runCli(store, ["list"])).output);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

void main();
