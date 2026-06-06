# Block 02 — Modules & npm

## ES Modules vs CommonJS

Node has two module systems:

- **ES Modules (ESM)** — `import` / `export`. The modern standard; this repo uses it
  (`"type": "module"` in `package.json`).
- **CommonJS (CJS)** — `require()` / `module.exports`. The original Node system, still
  everywhere in older code.

```ts
// ESM (what we use)
import { readFile } from "node:fs/promises";
export function load() {}

// CommonJS (older style)
const { readFile } = require("node:fs/promises");
module.exports = { load };
```

## Named vs default exports

```ts
// named exports — preferred (explicit, refactor-friendly)
export function add(a: number, b: number): number {
  return a + b;
}

// a single default export
export default function main() {}
```

```ts
import main, { add } from "./calc.ts"; // default + named together
```

## The `node:` specifier

Built-in modules should be imported with the **`node:`** prefix. It's unambiguous (no npm
package could shadow it) and self-documenting:

```ts
import { randomUUID } from "node:crypto";
import { cpus, homedir } from "node:os";
import { join } from "node:path";
```

## `package.json` & npm

`package.json` describes your project: its `name`, `"type": "module"`, `scripts`, and
`dependencies`. Common commands:

```bash
npm install            # install everything in package.json
npm install <pkg>      # add a runtime dependency
npm install -D <pkg>   # add a dev dependency (e.g. typescript, tsx)
npm run <script>       # run a script from package.json
```

> Built-in modules (`node:*`) need **no install** — they ship with Node. You only
> `npm install` third-party packages.

---

## Exercises

Open [`src/exercises.ts`](./src/exercises.ts) and implement each `// TODO`, importing the
relevant **`node:` built-ins**. Then run:

```bash
node --import tsx --test "blocks/02-modules-and-npm/tests/*.test.ts"
```

1. `uuid()` — return a random UUID using `node:crypto`'s `randomUUID`.
2. `cpuCount()` — return how many CPU cores this machine has (`node:os` `cpus`).
3. `homeDir()` — return the current user's home directory (`node:os` `homedir`).

Then compare with [`solutions/`](./solutions).
