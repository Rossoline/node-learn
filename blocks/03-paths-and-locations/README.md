# Block 03 — Paths & Locations

**English** · [Українська](./README.uk.md)

File paths differ across operating systems (`/` on macOS/Linux, `\` on Windows). The
`node:path` module builds and parses them **portably** — never hand-concatenate paths.

## `node:path`

```ts
import { join, resolve, basename, extname, dirname } from "node:path";

join("src", "app", "index.ts");   // "src/app/index.ts"  (or "src\\app\\index.ts" on Windows)
resolve("src", "index.ts");        // absolute path from the cwd
basename("/usr/bin/node");         // "node"
extname("archive.tar.gz");         // ".gz"
dirname("/usr/bin/node");          // "/usr/bin"
```

- **`join`** glues segments with the right separator and normalizes `.`/`..`.
- **`resolve`** produces an absolute path (resolving from the current directory).
- **`basename` / `dirname` / `extname`** take a path apart.

## `import.meta.url` and recreating `__dirname`

In CommonJS you had the magic globals `__dirname` and `__filename`. **ES modules don't**
— instead each module knows its own URL via `import.meta.url`. Convert it to a path with
`node:url`:

```ts
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

`import.meta.url` is a `file://` URL string; `fileURLToPath` turns it into a real
OS path (handling drive letters, encoding, etc.) so you should never parse it by hand.

> Going the other way — a path to a URL — use `pathToFileURL(p)` from `node:url`.

---

## Exercises

Open [`src/exercises.ts`](./src/exercises.ts) and implement each `// TODO` using
`node:path` / `node:url`. Then run:

```bash
node --import tsx --test "blocks/03-paths-and-locations/tests/*.test.ts"
```

1. `joinPath(...segments)` — portably join path segments (`node:path` `join`).
2. `fileExtension(filename)` — return the extension including the dot (`extname`).
3. `currentDir(fileUrl)` — given a `file://` URL (like `import.meta.url`), return the
   **directory** that contains it (`fileURLToPath` + `dirname`).

Then compare with [`solutions/`](./solutions).
