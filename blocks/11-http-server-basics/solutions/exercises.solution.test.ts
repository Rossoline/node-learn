// Verifies the reference solution. Run with:  npm run test:solutions
import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";
import type { Server } from "node:http";
import type { AddressInfo } from "node:net";
import { makeServer } from "./exercises.solution.ts";

let server: Server;
let base = "";

before(async () => {
  server = makeServer();
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const { port } = server.address() as AddressInfo;
  base = `http://localhost:${port}`;
});

after(async () => {
  await new Promise<void>((resolve, reject) =>
    server.close((err) => (err ? reject(err) : resolve())),
  );
});

describe("Block 11 — solution", () => {
  test("GET / returns the greeting", async () => {
    const res = await fetch(`${base}/`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get("content-type") ?? "", /text\/plain/);
    assert.equal(await res.text(), "Hello, Node HTTP!");
  });

  test("GET /health returns JSON via sendJson", async () => {
    const res = await fetch(`${base}/health`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get("content-type") ?? "", /application\/json/);
    assert.deepEqual(await res.json(), { status: "ok" });
  });

  test("unknown routes return 404", async () => {
    const res = await fetch(`${base}/nope`);
    assert.equal(res.status, 404);
    assert.equal(await res.text(), "Not Found");
  });

  test("wrong method returns 404", async () => {
    const res = await fetch(`${base}/`, { method: "POST" });
    assert.equal(res.status, 404);
  });
});
