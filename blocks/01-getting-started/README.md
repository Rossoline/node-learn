# Block 01 — Getting Started

## What is Node.js?

Node.js runs JavaScript **outside the browser** — on your machine or a server. Instead of
a `window` and the DOM, you get APIs for the **filesystem, network, processes, and
streams**. We write everything in **TypeScript** and run it with `tsx` (no build step):

```bash
npm run play blocks/01-getting-started/src/examples.ts
```

## Your first test (`node:test`)

Node ships a **built-in test runner** — nothing to install. Tests use `node:test` and
`node:assert/strict`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { greet } from "../src/exercises.ts";

test("greet says hello", () => {
  assert.equal(greet("Ada"), "Hello from Node, Ada!");
});
```

Run this block's tests:

```bash
node --import tsx --test "blocks/01-getting-started/tests/*.test.ts"
# or simply: npm test   (runs every block)
```

> `assert.equal(actual, expected)` from `node:assert/strict` uses strict (`===`)
> comparison. For objects/arrays use `assert.deepEqual`.

## `process`: arguments and environment

A Node program can read its command-line arguments and environment variables through the
global `process`:

```ts
process.argv;  // ["node", "/path/script.ts", ...your args]
process.env;   // { PATH: "...", HOME: "...", ... }
```

`process.argv` always starts with the Node binary and the script path; the **real**
arguments come after the first two:

```ts
const args = process.argv.slice(2);
```

Environment variables are **strings or `undefined`** — there's no guarantee a key exists,
so always provide a fallback:

```ts
const port = process.env.PORT ?? "3000"; // process.env.PORT is string | undefined
```

> Under this repo's `strict` settings (`noUncheckedIndexedAccess`), `process.env.WHATEVER`
> is typed `string | undefined` on purpose — handle the missing case.

---

## Exercises

Open [`src/exercises.ts`](./src/exercises.ts) and implement each `// TODO`. Then run:

```bash
node --import tsx --test "blocks/01-getting-started/tests/*.test.ts"
```

1. `greet(name)` — return `"Hello from Node, <name>!"`.
2. `parseArgs(argv)` — given a `process.argv`-style array, return only the user arguments
   (everything after the first two entries).
3. `getEnvOrDefault(key, fallback)` — return `process.env[key]` if set, otherwise
   `fallback`.

When the tests are green, compare with [`solutions/`](./solutions).
