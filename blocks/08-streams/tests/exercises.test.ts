import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { Readable } from "node:stream";
import { collect, countBytes, upperCase } from "../src/exercises.ts";

describe("Block 08 — Streams", () => {
  test("collect concatenates every chunk", async () => {
    assert.equal(await collect(Readable.from(["Hello, ", "streams!"])), "Hello, streams!");
    assert.equal(await collect(Readable.from([])), "");
  });

  test("countBytes totals the bytes flowing through", async () => {
    assert.equal(await countBytes(Readable.from(["abc", "de"])), 5);
    // "é" is 2 bytes in UTF-8, so byte count > character count.
    assert.equal(await countBytes(Readable.from(["é"])), 2);
  });

  test("upperCase transforms text passing through it", async () => {
    const out = await collect(Readable.from(["aB", "cd"]).pipe(upperCase()));
    assert.equal(out, "ABCD");
  });
});
