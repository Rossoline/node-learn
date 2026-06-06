// Block 02 — Reference solutions
// Try the exercises yourself first! Read this only to check your work.
import { randomUUID } from "node:crypto";
import { cpus, homedir } from "node:os";

export function uuid(): string {
  return randomUUID();
}

export function cpuCount(): number {
  return cpus().length;
}

export function homeDir(): string {
  return homedir();
}

// Notes:
// - The `node:` prefix marks these as built-in modules — no npm install needed.
// - `randomUUID()` returns a RFC 4122 v4 UUID string.
// - `cpus()` returns one entry per logical core; `.length` is the core count.
// - `homedir()` returns the OS-specific home path (e.g. /home/ada or C:\Users\ada).
