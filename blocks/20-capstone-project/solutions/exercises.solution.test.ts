// Verifies the reference solution. Run with:  npm run test:solutions
import { test, describe, before, after, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { Server } from "node:http";
import type { AddressInfo } from "node:net";
import { ok, err } from "./result.ts";
import { createTask, completeTask } from "./task.ts";
import { TaskStore } from "./store.ts";
import { makeServer } from "./api.ts";
import { runCli } from "./cli.ts";
import * as lib from "./index.ts";

describe("units (solution)", () => {
  test("result constructors", () => {
    assert.deepEqual(ok(1), { ok: true, value: 1 });
    assert.deepEqual(err("bad"), { ok: false, error: "bad" });
  });

  test("task helpers are pure", () => {
    const t = createTask(1, "x");
    assert.deepEqual(t, { id: 1, title: "x", done: false });
    assert.deepEqual(completeTask(t), { id: 1, title: "x", done: true });
    assert.equal(t.done, false, "completeTask must not mutate its input");
  });
});

describe("CLI (solution)", () => {
  let dir: string;
  let store: TaskStore;
  beforeEach(async () => {
    dir = await mkdtemp(join(tmpdir(), "node-learn-20s-"));
    store = new TaskStore(join(dir, "tasks.json"));
  });
  afterEach(async () => {
    await rm(dir, { recursive: true, force: true });
  });

  test("add, list, done flow", async () => {
    assert.deepEqual(await runCli(store, ["add", "Buy milk"]), {
      output: "added #1: Buy milk",
      exitCode: 0,
    });
    await runCli(store, ["add", "Write README"]);
    assert.deepEqual(await runCli(store, ["list"]), {
      output: "[ ] 1. Buy milk\n[ ] 2. Write README",
      exitCode: 0,
    });
    assert.deepEqual(await runCli(store, ["done", "1"]), {
      output: "completed #1",
      exitCode: 0,
    });
    assert.equal((await runCli(store, ["list"])).output.startsWith("[x] 1."), true);
  });

  test("done on a missing task exits non-zero", async () => {
    assert.deepEqual(await runCli(store, ["done", "99"]), {
      output: "task 99 not found",
      exitCode: 1,
    });
  });

  test("unknown command exits non-zero", async () => {
    assert.deepEqual(await runCli(store, ["frobnicate"]), {
      output: "unknown command: frobnicate",
      exitCode: 1,
    });
  });
});

describe("HTTP API (solution)", () => {
  let dir: string;
  let server: Server;
  let base = "";
  before(async () => {
    dir = await mkdtemp(join(tmpdir(), "node-learn-20sh-"));
    server = makeServer(new TaskStore(join(dir, "tasks.json")));
    await new Promise<void>((resolve) => server.listen(0, resolve));
    base = `http://localhost:${(server.address() as AddressInfo).port}`;
  });
  after(async () => {
    await new Promise<void>((resolve, reject) =>
      server.close((e) => (e ? reject(e) : resolve())),
    );
    await rm(dir, { recursive: true, force: true });
  });

  test("POST then GET /tasks", async () => {
    const created = await fetch(`${base}/tasks`, {
      method: "POST",
      body: JSON.stringify({ title: "via http" }),
    });
    assert.equal(created.status, 201);
    assert.deepEqual(await created.json(), { id: 1, title: "via http", done: false });

    const list = await fetch(`${base}/tasks`);
    assert.equal(list.status, 200);
    assert.deepEqual(await list.json(), [{ id: 1, title: "via http", done: false }]);
  });

  test("unknown route -> 404", async () => {
    const res = await fetch(`${base}/nope`);
    assert.equal(res.status, 404);
  });
});

describe("barrel (solution)", () => {
  test("index re-exports the public API", () => {
    const api = lib as Record<string, unknown>;
    for (const name of ["ok", "err", "createTask", "completeTask", "TaskStore", "makeServer", "runCli"]) {
      assert.equal(typeof api[name], "function", `index should re-export ${name}`);
    }
  });
});
