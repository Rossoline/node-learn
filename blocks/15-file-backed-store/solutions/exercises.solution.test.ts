// Verifies the reference solution. Run with:  npm run test:solutions
import { test, describe, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { FileStore } from "./exercises.solution.ts";

type Task = { id: number; title: string };

let dir: string;
let store: FileStore<Task>;

beforeEach(async () => {
  dir = await mkdtemp(join(tmpdir(), "node-learn-15s-"));
  store = new FileStore<Task>(join(dir, "tasks.json"));
});
afterEach(async () => {
  await rm(dir, { recursive: true, force: true });
});

describe("Block 15 — solution", () => {
  test("all() is empty before anything is written", async () => {
    assert.deepEqual(await store.all(), []);
  });

  test("add() persists and all() reads it back", async () => {
    await store.add({ id: 1, title: "first" });
    await store.add({ id: 2, title: "second" });
    assert.deepEqual(await store.all(), [
      { id: 1, title: "first" },
      { id: 2, title: "second" },
    ]);
  });

  test("get() finds by id or returns undefined", async () => {
    await store.add({ id: 1, title: "first" });
    assert.deepEqual(await store.get(1), { id: 1, title: "first" });
    assert.equal(await store.get(99), undefined);
  });

  test("remove() reports whether it deleted", async () => {
    await store.add({ id: 1, title: "first" });
    await store.add({ id: 2, title: "second" });
    assert.equal(await store.remove(1), true);
    assert.equal(await store.remove(1), false);
    assert.deepEqual(await store.all(), [{ id: 2, title: "second" }]);
  });

  test("a fresh store sees data persisted by another instance", async () => {
    await store.add({ id: 7, title: "shared" });
    const reopened = new FileStore<Task>(join(dir, "tasks.json"));
    assert.deepEqual(await reopened.all(), [{ id: 7, title: "shared" }]);
  });
});
