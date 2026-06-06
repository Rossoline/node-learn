// Block 16 — Reference solutions
// Try the exercises yourself first! Read this only to check your work.
import { execFile, spawn } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export async function evalNode(code: string): Promise<string> {
  const { stdout } = await execFileAsync(process.execPath, ["-e", code]);
  return stdout.trim();
}

export function runNode(
  args: string[],
): Promise<{ stdout: string; exitCode: number }> {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args);
    let stdout = "";
    child.stdout?.on("data", (chunk) => {
      stdout += chunk;
    });
    child.on("error", reject); // e.g. the binary couldn't be spawned at all
    child.on("close", (code) => {
      resolve({ stdout, exitCode: code ?? 0 });
    });
  });
}

// Notes:
// - evalNode uses execFile (buffered). It rejects automatically if node exits non-zero,
//   which is the right default for "this command must succeed".
// - runNode uses spawn so it can report ANY exit code without throwing — useful when a
//   non-zero exit is an expected outcome you want to inspect.
// - The exit code from "close" is `number | null` (null if the process was killed by a
//   signal), so we default it to 0.
