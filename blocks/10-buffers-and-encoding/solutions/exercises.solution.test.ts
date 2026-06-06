// Verifies the reference solution. Run with:  npm run test:solutions
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { toBase64, fromBase64, byteLength } from "./exercises.solution.ts";

describe("Block 10 — solution", () => {
  test("toBase64 encodes UTF-8 text", () => {
    assert.equal(toBase64("hello"), "aGVsbG8=");
  });

  test("fromBase64 decodes back to text", () => {
    assert.equal(fromBase64("aGVsbG8="), "hello");
  });

  test("base64 round-trips, including non-ASCII", () => {
    assert.equal(fromBase64(toBase64("héllo, Node")), "héllo, Node");
  });

  test("byteLength counts bytes, not characters", () => {
    assert.equal(byteLength("hello"), 5);
    assert.equal(byteLength("é"), 2);
    assert.equal(byteLength(""), 0);
  });
});
