import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { toBase64, fromBase64, byteLength } from "../src/exercises.ts";

describe("Block 10 — Buffers & Encoding", () => {
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
    assert.equal(byteLength("é"), 2); // one character, two UTF-8 bytes
    assert.equal(byteLength(""), 0);
  });
});
