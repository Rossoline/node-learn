# Block 15 — A File-Backed Data Store

**English** · [Українська](./README.uk.md)

A simple way to persist data without a database: keep a JSON file and load/save it. We'll
wrap that in a **typed, generic repository** — the pattern behind many small tools.

## The load → mutate → save cycle

Every operation reads the current state, changes it, and writes it back:

```ts
const items = await load();      // read + parse the JSON file
items.push(newItem);             // mutate in memory
await save(items);               // stringify + write back
```

## Handling "file doesn't exist yet"

The first read fails with `ENOENT` because the file hasn't been created. Treat that as
"empty", and rethrow anything else:

```ts
async function load(): Promise<T[]> {
  try {
    return JSON.parse(await readFile(path, "utf8")) as T[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}
```

## A generic, typed store

Constraining `T` to `{ id: number }` lets the store implement lookups and removal:

```ts
class FileStore<T extends { id: number }> {
  constructor(private filePath: string) {}
  // load/save are provided; you implement all/get/add/remove
}
```

> This naive store rewrites the whole file each time and isn't safe under concurrent
> writers — fine for a CLI or small service, not a high-traffic server.

---

## Exercises

Open [`src/exercises.ts`](./src/exercises.ts) and implement the `FileStore` methods. Then
run:

```bash
node --import tsx --test "blocks/15-file-backed-store/tests/*.test.ts"
```

(`load` and `save` are provided.)

1. `all()` — return every item (`[]` when the file doesn't exist yet).
2. `get(id)` — return the item with that `id`, or `undefined`.
3. `add(item)` — append an item and persist.
4. `remove(id)` — delete by `id`; return `true` if something was removed, else `false`.

Then compare with [`solutions/`](./solutions).
