import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  tryCatch,
  exitCodeFor,
  getErrorMessage,
  AppError,
} from "../src/exercises.ts";

describe("Block 05 — Errors & the Process", () => {
  test("tryCatch captures success and failure", () => {
    assert.deepEqual(tryCatch(() => 42), { ok: true, value: 42 });

    const failed = tryCatch(() => {
      throw new Error("boom");
    });
    assert.equal(failed.ok, false);
    if (!failed.ok) assert.equal(failed.error.message, "boom");

    const thrownString = tryCatch(() => {
      throw "just a string";
    });
    assert.equal(thrownString.ok, false);
    if (!thrownString.ok) {
      assert.ok(thrownString.error instanceof Error);
      assert.equal(thrownString.error.message, "just a string");
    }
  });

  test("exitCodeFor maps errors to exit codes", () => {
    assert.equal(exitCodeFor(new AppError("nope", 3)), 3);
    assert.equal(exitCodeFor(new Error("generic")), 1);
    assert.equal(exitCodeFor("not even an error"), 1);
  });

  test("getErrorMessage narrows unknown errors", () => {
    assert.equal(getErrorMessage(new Error("boom")), "boom");
    assert.equal(getErrorMessage("oops"), "oops");
    assert.equal(getErrorMessage(123), "unknown error");
  });
});
