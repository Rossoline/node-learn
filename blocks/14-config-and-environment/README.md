# Block 14 — Config & Environment

Configuration comes from the **environment** (`process.env`) so the same code runs in
dev, CI, and production without edits. The skills: read env vars, load a `.env` file, and
**validate** what you got into a typed config — failing fast on mistakes.

## `process.env`

Every value is `string | undefined`. Always handle "missing":

```ts
const port = process.env.PORT ?? "3000"; // string | undefined -> string
```

## `.env` files

A `.env` file is `KEY=value` lines (with `#` comments). Node 20.6+ can even load one with
`node --env-file=.env app.ts`. Conceptually it's just text you parse into key/value pairs:

```
# server
PORT=8080
HOST=example.com
DEBUG=true
```

> Never commit real secrets. Commit a `.env.example` and keep `.env` git-ignored.

## Validate into a typed config

Turn loose strings into a typed object, applying defaults and rejecting bad input:

```ts
type Config = { port: number; host: string; debug: boolean };

function loadConfig(env: Record<string, string | undefined>): Config {
  if (!env.PORT) throw new Error("PORT is required");
  const port = Number(env.PORT);
  if (!Number.isInteger(port)) throw new Error("PORT must be a number");
  return { port, host: env.HOST ?? "localhost", debug: env.DEBUG === "true" };
}
```

Fail-fast validation means a misconfigured app crashes **at startup** with a clear
message, not deep in a request later.

---

## Exercises

Open [`src/exercises.ts`](./src/exercises.ts) and implement each `// TODO`. Then run:

```bash
node --import tsx --test "blocks/14-config-and-environment/tests/*.test.ts"
```

1. `parseEnv(text)` — parse `.env`-style text into a `Record<string, string>`
   (skip blank lines and `#` comments; split on the first `=`).
2. `loadConfig(env)` — return a typed `Config`:
   - `PORT` — **required**, must be an integer (else throw).
   - `HOST` — optional, default `"localhost"`.
   - `DEBUG` — `true` only when the value is exactly `"true"`.

Then compare with [`solutions/`](./solutions).
