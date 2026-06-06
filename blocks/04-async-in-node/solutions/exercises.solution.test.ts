// Verifies the reference solution. Run with:  npm run test:solutions
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { delay, parseNumber, mapAsync } from "./exercises.solution.ts";

describe("Block 04 — solution", () => {
  test("delay resolves to undefined after waiting", async () => {
    const start = Date.now();
    const result = await delay(15);
    assert.equal(result, undefined);
    assert.ok(Date.now() - start >= 10, "should wait roughly the given time");
  });

  test("parseNumber resolves numbers and rejects junk", async () => {
    assert.equal(await parseNumber("42"), 42);
    assert.equal(await parseNumber("3.14"), 3.14);
    await assert.rejects(parseNumber("abc"), /not a number/);
    await assert.rejects(parseNumber(""), /not a number/);
  });

  test("mapAsync runs in parallel, preserving order", async () => {
    const out = await mapAsync([1, 2, 3], async (n) => n * 2);
    assert.deepEqual(out, [2, 4, 6]);
    assert.deepEqual(await mapAsync<number, number>([], async (n) => n), []);
  });
});
