// Verifies the reference solution. Run with:  npm run test:solutions
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { Readable } from "node:stream";
import { parseFlags, readInput, repeatGreeting } from "./exercises.solution.ts";

describe("Block 17 — solution", () => {
  test("parseFlags reads flags and applies defaults", () => {
    assert.deepEqual(parseFlags(["--name", "Ada", "--verbose", "--count", "3"]), {
      name: "Ada",
      verbose: true,
      count: 3,
    });
    assert.deepEqual(parseFlags([]), { name: "world", verbose: false, count: 1 });
  });

  test("readInput collects a stream", async () => {
    assert.equal(await readInput(Readable.from(["line1\n", "line2"])), "line1\nline2");
    assert.equal(await readInput(Readable.from([])), "");
  });

  test("repeatGreeting builds N lines", () => {
    assert.equal(repeatGreeting("Ada", 2), "Hello, Ada!\nHello, Ada!");
    assert.equal(repeatGreeting("x", 1), "Hello, x!");
    assert.equal(repeatGreeting("x", 0), "");
  });
});
