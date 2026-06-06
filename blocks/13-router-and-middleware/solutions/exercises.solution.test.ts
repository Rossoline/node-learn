// Verifies the reference solution. Run with:  npm run test:solutions
import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";
import type { Server, IncomingMessage, ServerResponse } from "node:http";
import type { AddressInfo } from "node:net";
import { Router, withLogging, makeServer } from "./exercises.solution.ts";

describe("withLogging (unit, solution)", () => {
  test("logs the request line, then delegates", async () => {
    const lines: string[] = [];
    let ran = false;
    const wrapped = withLogging(
      async () => {
        ran = true;
      },
      (line) => lines.push(line),
    );
    await wrapped(
      { method: "GET", url: "/x" } as IncomingMessage,
      {} as ServerResponse,
    );
    assert.deepEqual(lines, ["GET /x"]);
    assert.ok(ran, "wrapped handler should run");
  });
});

describe("Block 13 — solution (server)", () => {
  let server: Server;
  let base = "";

  before(async () => {
    const router = new Router();
    router.get("/", (_req, res) => {
      res.statusCode = 200;
      res.end("root");
    });
    router.post("/items", (_req, res) => {
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ created: true }));
    });
    router.get("/boom", () => {
      throw new Error("kaboom");
    });

    server = makeServer(router);
    await new Promise<void>((resolve) => server.listen(0, resolve));
    base = `http://localhost:${(server.address() as AddressInfo).port}`;
  });
  after(async () => {
    await new Promise<void>((resolve, reject) =>
      server.close((err) => (err ? reject(err) : resolve())),
    );
  });

  test("dispatches GET and POST routes", async () => {
    const root = await fetch(`${base}/`);
    assert.equal(root.status, 200);
    assert.equal(await root.text(), "root");

    const items = await fetch(`${base}/items`, { method: "POST" });
    assert.equal(items.status, 201);
    assert.deepEqual(await items.json(), { created: true });
  });

  test("unknown route -> 404 JSON", async () => {
    const res = await fetch(`${base}/missing`);
    assert.equal(res.status, 404);
    assert.deepEqual(await res.json(), { error: "not found" });
  });

  test("a throwing handler -> 500 (error boundary)", async () => {
    const res = await fetch(`${base}/boom`);
    assert.equal(res.status, 500);
    assert.deepEqual(await res.json(), { error: "server error" });
  });
});
