// Verifies the reference solution. Run with:  npm run test:solutions
import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";
import type { Server } from "node:http";
import type { AddressInfo } from "node:net";
import { parseQuery, makeServer } from "./exercises.solution.ts";

describe("parseQuery (unit, solution)", () => {
  test("parses query parameters", () => {
    assert.deepEqual(parseQuery("/search?q=node&limit=5"), { q: "node", limit: "5" });
    assert.deepEqual(parseQuery("/search"), {});
  });
});

describe("Block 12 — solution (server)", () => {
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

  test("GET /search echoes parsed query params", async () => {
    const res = await fetch(`${base}/search?q=node&limit=5`);
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { params: { q: "node", limit: "5" } });
  });

  test("POST /echo returns the JSON body", async () => {
    const res = await fetch(`${base}/echo`, {
      method: "POST",
      body: JSON.stringify({ a: 1, b: ["x"] }),
    });
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { echo: { a: 1, b: ["x"] } });
  });

  test("unknown routes return 404 JSON", async () => {
    const res = await fetch(`${base}/nope`);
    assert.equal(res.status, 404);
    assert.deepEqual(await res.json(), { error: "not found" });
  });
});
