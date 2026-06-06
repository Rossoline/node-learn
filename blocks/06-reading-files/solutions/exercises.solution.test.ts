// Verifies the reference solution. Run with:  npm run test:solutions
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readText, listFiles, readJson } from "./exercises.solution.ts";

const fixtures = join(dirname(fileURLToPath(import.meta.url)), "..", "fixtures");

describe("Block 06 — solution", () => {
  test("readText reads a UTF-8 file", async () => {
    assert.equal(await readText(join(fixtures, "hello.txt")), "Hello, files!\n");
  });

  test("listFiles returns sorted entry names", async () => {
    assert.deepEqual(await listFiles(fixtures), ["data.json", "hello.txt"]);
  });

  test("readJson parses JSON into the chosen type", async () => {
    const data = await readJson<{ name: string; version: number; topics: string[] }>(
      join(fixtures, "data.json"),
    );
    assert.equal(data.name, "node-learn");
    assert.equal(data.version, 1);
    assert.deepEqual(data.topics, ["fs", "json"]);
  });

  test("reading a missing file rejects", async () => {
    await assert.rejects(readText(join(fixtures, "nope.txt")));
  });
});
