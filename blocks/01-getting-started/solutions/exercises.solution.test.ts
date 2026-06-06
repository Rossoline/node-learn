// Verifies the reference solution. Run with:  npm run test:solutions
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { greet, parseArgs, getEnvOrDefault } from "./exercises.solution.ts";

describe("Block 01 — solution", () => {
  test("greet returns a Node greeting", () => {
    assert.equal(greet("Ada"), "Hello from Node, Ada!");
    assert.equal(greet("World"), "Hello from Node, World!");
  });

  test("parseArgs drops the node binary and script path", () => {
    assert.deepEqual(parseArgs(["node", "app.ts", "build", "--watch"]), [
      "build",
      "--watch",
    ]);
    assert.deepEqual(parseArgs(["node", "app.ts"]), []);
  });

  test("getEnvOrDefault reads env with a fallback", () => {
    const KEY = "NODE_LEARN_TEST_VAR";
    const had = Object.prototype.hasOwnProperty.call(process.env, KEY);
    const previous = process.env[KEY];
    try {
      process.env[KEY] = "from-env";
      assert.equal(getEnvOrDefault(KEY, "fallback"), "from-env");

      delete process.env[KEY];
      assert.equal(getEnvOrDefault(KEY, "fallback"), "fallback");
    } finally {
      if (had) process.env[KEY] = previous;
      else delete process.env[KEY];
    }
  });
});
