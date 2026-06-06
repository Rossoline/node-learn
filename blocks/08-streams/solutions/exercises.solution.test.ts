// Verifies the reference solution. Run with:  npm run test:solutions
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { Readable } from "node:stream";
import { collect, countBytes, upperCase } from "./exercises.solution.ts";

describe("Block 08 — solution", () => {
  test("collect concatenates every chunk", async () => {
    assert.equal(await collect(Readable.from(["Hello, ", "streams!"])), "Hello, streams!");
    assert.equal(await collect(Readable.from([])), "");
  });

  test("countBytes totals the bytes flowing through", async () => {
    assert.equal(await countBytes(Readable.from(["abc", "de"])), 5);
    assert.equal(await countBytes(Readable.from(["é"])), 2);
  });

  test("upperCase transforms text passing through it", async () => {
    const out = await collect(Readable.from(["aB", "cd"]).pipe(upperCase()));
    assert.equal(out, "ABCD");
  });
});
