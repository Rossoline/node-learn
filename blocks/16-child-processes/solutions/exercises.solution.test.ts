// Verifies the reference solution. Run with:  npm run test:solutions
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { evalNode, runNode } from "./exercises.solution.ts";

describe("Block 16 — solution", () => {
  test("evalNode runs node -e and returns trimmed stdout", async () => {
    assert.equal(await evalNode("console.log(1 + 1)"), "2");
    assert.equal(await evalNode("console.log('hi'.toUpperCase())"), "HI");
  });

  test("evalNode rejects when the child exits non-zero", async () => {
    await assert.rejects(evalNode("process.exit(1)"));
  });

  test("runNode collects stdout and the exit code", async () => {
    const ok = await runNode(["-e", "process.stdout.write('ok')"]);
    assert.deepEqual(ok, { stdout: "ok", exitCode: 0 });
  });

  test("runNode reports a non-zero exit without rejecting", async () => {
    const failed = await runNode([
      "-e",
      "process.stdout.write('partial'); process.exit(2)",
    ]);
    assert.deepEqual(failed, { stdout: "partial", exitCode: 2 });
  });
});
