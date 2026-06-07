# Block 07 — Writing Files

**English** · [Українська](./README.uk.md)

Writing mirrors reading: same `node:fs/promises` module, just the other direction.

## Writing & appending

```ts
import { writeFile, appendFile } from "node:fs/promises";

await writeFile("out.txt", "hello\n");        // create or OVERWRITE
await appendFile("log.txt", "a line\n");      // add to the end (creates if missing)
```

Write JSON by stringifying first:

```ts
await writeFile("config.json", JSON.stringify(data, null, 2)); // pretty-printed
```

## Creating & removing directories

```ts
import { mkdir, rm } from "node:fs/promises";

await mkdir("a/b/c", { recursive: true }); // make the whole chain, no error if it exists
await rm("a", { recursive: true, force: true }); // delete a tree, ignore "missing"
```

`{ recursive: true }` is the usual choice; `force: true` on `rm` means "don't error if
it's already gone".

## Atomic-ish writes: temp then rename

If a program crashes **mid-write**, a file can be left half-written. Writing to a temp
file and then **renaming** avoids that — a rename on the same filesystem is atomic, so
readers see either the old file or the complete new one, never a partial:

```ts
import { writeFile, rename } from "node:fs/promises";

await writeFile("data.json.tmp", contents);
await rename("data.json.tmp", "data.json");
```

---

## Exercises

Open [`src/exercises.ts`](./src/exercises.ts) and implement each `// TODO` with
`node:fs/promises`. Then run:

```bash
node --import tsx --test "blocks/07-writing-files/tests/*.test.ts"
```

1. `writeJson(path, data)` — write `data` as **pretty-printed** JSON (2-space indent).
2. `appendLine(path, line)` — append `line` followed by a newline (`\n`).
3. `writeAtomic(path, contents)` — write to `path + ".tmp"` then `rename` it to `path`.

(The tests use a throwaway temp directory and clean it up.) Then compare with
[`solutions/`](./solutions).
