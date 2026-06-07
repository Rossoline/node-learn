# Block 10 — Buffers & Encoding

**English** · [Українська](./README.uk.md)

A **`Buffer`** is Node's container for **raw bytes** — the data behind files, sockets, and
crypto. Text is just bytes under some **encoding** (usually UTF-8).

## Strings ⇄ bytes

```ts
const bytes = Buffer.from("hello", "utf8"); // string -> Buffer
const text = bytes.toString("utf8");        // Buffer -> string
```

The encoding matters in both directions: `"utf8"`, `"hex"`, `"base64"`, `"ascii"`, …

```ts
Buffer.from("hello", "utf8").toString("base64"); // "aGVsbG8="
Buffer.from("aGVsbG8=", "base64").toString("utf8"); // "hello"
Buffer.from("hello", "utf8").toString("hex"); // "68656c6c6f"
```

## Byte length ≠ string length

A character can take more than one byte in UTF-8:

```ts
"é".length;                       // 1 (one character)
Buffer.byteLength("é", "utf8");   // 2 (two bytes)
```

Use `Buffer.byteLength` whenever you need the real size (e.g. a `Content-Length` header).

## Joining buffers

```ts
Buffer.concat([Buffer.from("foo"), Buffer.from("bar")]).toString(); // "foobar"
```

> The Web-standard `TextEncoder`/`TextDecoder` also work in Node and produce/consume
> `Uint8Array`s — handy for cross-platform code.

---

## Exercises

Open [`src/exercises.ts`](./src/exercises.ts) and implement each `// TODO`. Then run:

```bash
node --import tsx --test "blocks/10-buffers-and-encoding/tests/*.test.ts"
```

1. `toBase64(text)` — encode a UTF-8 string to base64.
2. `fromBase64(b64)` — decode base64 back to a UTF-8 string.
3. `byteLength(text)` — the number of **bytes** a UTF-8 string occupies.

Then compare with [`solutions/`](./solutions).
