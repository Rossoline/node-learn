# Block 04 — Async in Node

**English** · [Українська](./README.uk.md)

Node is built around **non-blocking** I/O: instead of waiting, you schedule work and get
called back later. Today that means **promises** and `async`/`await`.

## Promises & `async`/`await`

```ts
async function loadThing(): Promise<string> {
  const value = await somethingAsync(); // unwraps the promise
  return value;
}
```

An `async` function always returns a `Promise`. `await` pauses until the promise settles,
giving you the value (or throwing on rejection).

## Turning a callback API into a promise

Old Node APIs use **error-first callbacks** — `(err, value) => ...`. Wrap one in a
`Promise` to use `await`:

```ts
function readThing(cb: (err: Error | null, value?: string) => void): void { /* ... */ }

function readThingAsync(): Promise<string> {
  return new Promise((resolve, reject) => {
    readThing((err, value) => {
      if (err) reject(err);
      else resolve(value!);
    });
  });
}
```

For standard error-first callbacks, `node:util`'s `promisify` does this for you:

```ts
import { promisify } from "node:util";
const readThingAsync = promisify(readThing);
```

## Sequential vs parallel

```ts
// sequential — each await waits for the previous
const a = await taskA();
const b = await taskB();

// parallel — start everything, then wait for all
const [x, y] = await Promise.all([taskA(), taskB()]);
const results = await Promise.all(items.map(fn)); // map + all
```

## Timers & ordering (intuition)

Microtasks (resolved promises) run **before** the next timer:

```ts
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
// prints: "promise" then "timeout"
```

---

## Exercises

Open [`src/exercises.ts`](./src/exercises.ts) and implement each `// TODO`. Then run:

```bash
node --import tsx --test "blocks/04-async-in-node/tests/*.test.ts"
```

1. `delay(ms)` — return a `Promise<void>` that resolves after `ms` milliseconds
   (wrap `setTimeout`).
2. `parseNumber(input)` — wrap the given error-first `parseNumberCb` in a promise:
   resolve the number, or reject for non-numeric input.
3. `mapAsync(items, fn)` — run `fn` over every item **in parallel** and return the
   results in order (`Promise.all`).

Then compare with [`solutions/`](./solutions).
