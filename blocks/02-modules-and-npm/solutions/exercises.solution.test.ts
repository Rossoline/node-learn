// Verifies the reference solution. Run with:  npm run test:solutions
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { cpus, homedir } from "node:os";
import { uuid, cpuCount, homeDir } from "./exercises.solution.ts";

const UUID_V4 =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe("Block 02 — solution", () => {
  test("uuid returns a v4 UUID, unique each call", () => {
    assert.match(uuid(), UUID_V4);
    assert.notEqual(uuid(), uuid());
  });

  test("cpuCount matches node:os and is positive", () => {
    assert.equal(cpuCount(), cpus().length);
    assert.ok(cpuCount() > 0);
  });

  test("homeDir matches node:os homedir()", () => {
    assert.equal(homeDir(), homedir());
  });
});
