# Block 16 — Child Processes

Node can run **other programs** — git, ffmpeg, another script — through
`node:child_process`. There are two styles you'll use most.

## `execFile` — run, then get the buffered output

Good for short commands whose output fits in memory. Promisify it to `await`:

```ts
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const { stdout, stderr } = await run("node", ["--version"]);
```

`execFile` **rejects** if the program exits non-zero (the error carries `code`, `stdout`,
`stderr`). Prefer `execFile` over `exec`: `execFile` passes args as an array (no shell),
avoiding quoting and injection issues.

## `spawn` — stream the output, handle the exit yourself

Good for long-running processes or large output. You wire up the streams and the `close`
event:

```ts
import { spawn } from "node:child_process";

const child = spawn("node", ["-e", "console.log('hi')"]);
child.stdout.on("data", (chunk) => { /* ... */ });
child.on("close", (code) => { /* exit code (number | null) */ });
```

## Exit codes

A child reports success/failure via its **exit code** (`0` = ok). `execFile` turns a
non-zero code into a rejection; with `spawn` you read it from the `close` event.

> To stay cross-platform, these exercises run **`node` itself** (`process.execPath`)
> instead of OS-specific commands.

---

## Exercises

Open [`src/exercises.ts`](./src/exercises.ts) and implement each `// TODO` with
`node:child_process`. Then run:

```bash
node --import tsx --test "blocks/16-child-processes/tests/*.test.ts"
```

1. `evalNode(code)` — run `node -e <code>` with `execFile` and return its trimmed
   `stdout`.
2. `runNode(args)` — `spawn` `node` with `args`, collect `stdout`, and resolve with
   `{ stdout, exitCode }` (handling non-zero exits without rejecting).

Then compare with [`solutions/`](./solutions).
