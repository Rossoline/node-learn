// Block 16 — Child Processes: worked examples
// Run me:  npm run play blocks/16-child-processes/src/examples.ts
export {}; // make this a module so top-level names don't clash across blocks

import { execFile, spawn } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);

async function main() {
  // execFile: buffered output, rejects on non-zero exit.
  const { stdout } = await run(process.execPath, ["--version"]);
  console.log("node version:", stdout.trim());

  // spawn: stream output, read the exit code from "close".
  const child = spawn(process.execPath, ["-e", "process.stdout.write('streamed'); process.exit(0)"]);
  let out = "";
  child.stdout?.on("data", (chunk) => (out += chunk));
  child.on("close", (code) => {
    console.log("spawn stdout:", JSON.stringify(out), "exit:", code);
  });

  // execFile rejecting on a non-zero exit.
  try {
    await run(process.execPath, ["-e", "process.exit(1)"]);
  } catch (err) {
    console.log("execFile rejected, code:", (err as { code?: number }).code);
  }
}

void main();
