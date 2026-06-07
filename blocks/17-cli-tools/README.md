# Block 17 — CLI Tools

**English** · [Українська](./README.uk.md)

A command-line tool reads **arguments** and **stdin**, writes **stdout**, and signals
success with an **exit code**. Node has everything built in.

## Parsing arguments with `parseArgs`

Hand-parsing `process.argv` gets messy. `node:util`'s `parseArgs` handles flags, values,
and defaults:

```ts
import { parseArgs } from "node:util";

const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    name: { type: "string", default: "world" },
    verbose: { type: "boolean", default: false },
    count: { type: "string", default: "1" }, // numbers arrive as strings
  },
});
// node app.ts --name Ada --verbose --count 3
// values.name = "Ada", values.verbose = true, values.count = "3"
```

`parseArgs` only produces `string`/`boolean`; convert numbers yourself with `Number(...)`.

## Reading stdin

`process.stdin` is a Readable stream — collect it like any other (block 08), so your tool
works in a pipe (`cat file | node app.ts`):

```ts
let input = "";
for await (const chunk of process.stdin) input += chunk;
```

## Writing output & exit codes

`console.log` writes a line to stdout; `console.error` writes to stderr. Set
`process.exitCode` to signal failure (`0` ok, non-zero = error) — see block 05.

---

## Exercises

Open [`src/exercises.ts`](./src/exercises.ts) and implement each `// TODO`. Then run:

```bash
node --import tsx --test "blocks/17-cli-tools/tests/*.test.ts"
```

1. `parseFlags(args)` — use `parseArgs` to return `{ name, verbose, count }` with
   defaults `"world"` / `false` / `1` (convert `count` to a number).
2. `readInput(stream)` — collect a Readable (like stdin) into a string.
3. `repeatGreeting(name, count)` — return `count` lines of `"Hello, <name>!"` joined by
   newlines.

Then compare with [`solutions/`](./solutions).
