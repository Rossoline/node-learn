import { test, describe, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, readFile, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { writeJson, appendLine, writeAtomic } from "../src/exercises.ts";

let dir: string;
beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), "node-learn-07-"));
});
afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

describe("Block 07 — Writing Files", () => {
  test("writeJson writes pretty JSON that round-trips", async () => {
    const file = join(dir, "out.json");
    await writeJson(file, { name: "node", nested: { ok: true } });
    const text = await readFile(file, "utf8");
    assert.ok(text.includes("\n  "), "should be indented (pretty-printed)");
    assert.deepEqual(JSON.parse(text), { name: "node", nested: { ok: true } });
  });

  test("appendLine appends lines with newlines", async () => {
    const file = join(dir, "log.txt");
    await appendLine(file, "first");
    await appendLine(file, "second");
    assert.equal(await readFile(file, "utf8"), "first\nsecond\n");
  });

  test("writeAtomic writes the file and leaves no .tmp behind", async () => {
    const file = join(dir, "data.txt");
    await writeAtomic(file, "hello");
    assert.equal(await readFile(file, "utf8"), "hello");
    assert.deepEqual(await readdir(dir), ["data.txt"]);
  });
});
