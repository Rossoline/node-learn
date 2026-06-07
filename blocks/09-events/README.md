# Block 09 — Events

**English** · [Українська](./README.uk.md)

Much of Node is **event-driven**: servers, streams, and processes all emit events you
subscribe to. The pattern is `EventEmitter`.

## `on` / `once` / `emit`

```ts
import { EventEmitter } from "node:events";

const bus = new EventEmitter();

bus.on("message", (text: string) => console.log("got:", text)); // every time
bus.once("ready", () => console.log("ready once"));             // first time only
bus.emit("message", "hello"); // triggers listeners synchronously
```

`emit(event, ...args)` calls every listener for `event`, in order, **synchronously**.

## The special `error` event

If an `EventEmitter` emits `"error"` and **no listener** is attached, Node throws and can
crash the process. Always handle it on emitters that may fail:

```ts
bus.on("error", (err) => console.error("handled:", err));
```

## Awaiting an event

`events.once` turns the next event into a promise — great for "wait until ready":

```ts
import { once } from "node:events";

const [value] = await once(bus, "data"); // resolves with the emitted args
```

## Typing events

A raw `EventEmitter` is untyped (`emit`/`on` take `any`). For safety, wrap it so each
event name maps to known argument types:

```ts
type Events = { message: [text: string]; count: [n: number] };
```

---

## Exercises

Open [`src/exercises.ts`](./src/exercises.ts) and implement each `// TODO` with
`node:events`. Then run:

```bash
node --import tsx --test "blocks/09-events/tests/*.test.ts"
```

1. `onceValue(emitter, event)` — resolve with the first payload emitted for `event`
   (use `once`).
2. `collectEvents(emitter, event)` — subscribe and return a getter for every payload
   received so far.
3. `TypedBus` — a small wrapper whose `on`/`emit` are **typed** by an event map.

Then compare with [`solutions/`](./solutions).
