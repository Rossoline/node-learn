# Block 06 — Reading Files

Node reads files through `node:fs`. Use the **promise-based** API (`node:fs/promises`) so
you can `await` instead of nesting callbacks.

## Reading text

```ts
import { readFile } from "node:fs/promises";

const text = await readFile("notes.txt", "utf8"); // string
```

Pass an **encoding** (`"utf8"`) to get a `string`. Without it you get a `Buffer` (raw
bytes — block 10).

## Reading JSON

JSON is just text you parse:

```ts
const raw = await readFile("config.json", "utf8");
const config = JSON.parse(raw) as { name: string };
```

## Listing a directory

```ts
import { readdir } from "node:fs/promises";

const names = await readdir("."); // string[] of entry names (not full paths)
```

`readdir` returns just the entry **names**; join them with the directory to get full
paths (block 03).

## Checking a path with `stat`

```ts
import { stat } from "node:fs/promises";

const info = await stat("notes.txt");
info.isFile();      // true
info.isDirectory(); // false
info.size;          // bytes
```

A missing file makes these reject with an `ENOENT` error — wrap in `try/catch` when the
file might not exist.

---

## Exercises

Open [`src/exercises.ts`](./src/exercises.ts) and implement each `// TODO` with
`node:fs/promises`. Then run:

```bash
node --import tsx --test "blocks/06-reading-files/tests/*.test.ts"
```

1. `readText(path)` — read a UTF-8 text file and return its contents.
2. `listFiles(dir)` — return the directory's entry names, **sorted** alphabetically.
3. `readJson(path)` — read a file and `JSON.parse` it (generic return type).

(The tests read from this block's `fixtures/` folder.) Then compare with
[`solutions/`](./solutions).
