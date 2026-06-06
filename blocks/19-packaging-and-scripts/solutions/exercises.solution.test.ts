// Verifies the reference solution. Run with:  npm run test:solutions
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  parseSemver,
  compareSemver,
  validatePackage,
} from "./exercises.solution.ts";

describe("Block 19 — solution", () => {
  test("parseSemver parses and validates", () => {
    assert.deepEqual(parseSemver("1.4.2"), { major: 1, minor: 4, patch: 2 });
    assert.throws(() => parseSemver("1.2"), /invalid version/);
    assert.throws(() => parseSemver("1.2.x"), /invalid version/);
    assert.throws(() => parseSemver("1.2.3.4"), /invalid version/);
    assert.throws(() => parseSemver("-1.0.0"), /invalid version/);
  });

  test("compareSemver orders versions", () => {
    assert.equal(compareSemver("1.0.0", "1.0.1"), -1);
    assert.equal(compareSemver("2.0.0", "1.9.9"), 1);
    assert.equal(compareSemver("1.2.3", "1.2.3"), 0);
    assert.equal(compareSemver("1.3.0", "1.2.9"), 1);
  });

  test("validatePackage narrows a manifest", () => {
    assert.deepEqual(validatePackage({ name: "node-learn", version: "1.0.0" }), {
      name: "node-learn",
      version: "1.0.0",
    });
    assert.throws(() => validatePackage(null), /must be an object/);
    assert.throws(() => validatePackage({ version: "1.0.0" }), /name is required/);
    assert.throws(() => validatePackage({ name: "x" }), /version is required/);
    assert.throws(() => validatePackage({ name: "x", version: "nope" }), /invalid version/);
  });
});
