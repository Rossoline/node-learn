# Block 08 — Streams

**English** · [Українська](./README.uk.md)

Streams process data **in chunks** instead of loading it all into memory — essential for
big files, network sockets, and anything you can start handling before it's fully arrived.

## The kinds of stream

- **Readable** — you read chunks out (a file read, an HTTP request body).
- **Writable** — you write chunks in (a file write, an HTTP response).
- **Transform** — readable *and* writable: data flows in, transformed data flows out.

## Reading a stream

A Readable is async-iterable, so you can `for await` over its chunks:

```ts
import { Readable } from "node:stream";

async function collect(source: Readable): Promise<string> {
  let out = "";
  for await (const chunk of source) out += chunk.toString();
  return out;
}

await collect(Readable.from(["Hello, ", "streams!"])); // "Hello, streams!"
```

## Piping & `pipeline`

`pipe` connects a Readable to a Writable. Prefer `pipeline` (from `node:stream/promises`)
— it handles errors and cleanup, and you can `await` it:

```ts
import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream } from "node:fs";

await pipeline(createReadStream("in.txt"), createWriteStream("out.txt"));
```

## Transforms & backpressure

A `Transform` rewrites chunks as they pass through:

```ts
import { Transform } from "node:stream";

const upper = new Transform({
  transform(chunk, _enc, cb) {
    cb(null, chunk.toString().toUpperCase());
  },
});
```

**Backpressure** is automatic with `pipe`/`pipeline`: if the destination is slow, the
source is paused. That's the whole point of streaming — bounded memory use.

---

## Exercises

Open [`src/exercises.ts`](./src/exercises.ts) and implement each `// TODO` using
`node:stream`. Then run:

```bash
node --import tsx --test "blocks/08-streams/tests/*.test.ts"
```

1. `collect(source)` — read every chunk of a Readable into a single string.
2. `countBytes(source)` — total the byte length of everything flowing through a Readable.
3. `upperCase()` — return a `Transform` that uppercases the text passing through it.

Then compare with [`solutions/`](./solutions).
