// Block 16 — Exercises
// Run tests:  node --import tsx --test "blocks/16-child-processes/tests/*.test.ts"
//
// Use node:child_process. Add the imports you need at the top.
// Run `node` itself via process.execPath so the tests work on any OS.

// 1. Run `node -e <code>` and return its trimmed stdout.
//    (Hint: promisify(execFile)(process.execPath, ["-e", code]).)
export async function evalNode(code: string): Promise<string> {
  void code; // remove this line once you use the parameter
  // TODO: run node with ["-e", code], return stdout.trim()
  throw new Error("Not implemented");
}

// 2. Spawn `node` with `args`, collect stdout, and resolve { stdout, exitCode }.
//    Do NOT reject on a non-zero exit — report it via exitCode (use 0 if null).
export function runNode(
  args: string[],
): Promise<{ stdout: string; exitCode: number }> {
  void args; // remove this line once you use the parameter
  // TODO: spawn process.execPath with args; accumulate stdout; on "close" resolve
  throw new Error("Not implemented");
}
