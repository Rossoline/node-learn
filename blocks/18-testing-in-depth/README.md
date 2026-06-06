# Block 18 — Testing in Depth

You've used `node:test` since block 01. Here are the features that make it a real test
framework — and how to write code that's **easy to test**.

## Structure & lifecycle

```ts
import { describe, it, before, after, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

describe("a feature", () => {
  beforeEach(() => {/* fresh state per test */});
  it("does a thing", () => assert.equal(1 + 1, 2));
});
```

## Async tests

Make the callback `async` and `await`; assert rejections explicitly:

```ts
it("loads data", async () => {
  assert.equal(await load(), 42);
});
it("rejects bad input", async () => {
  await assert.rejects(load(-1), /invalid/);
});
```

## Asserting thrown errors

```ts
assert.throws(() => parsePositive("-1"), /not a positive number/);
```

## Mocks & spies

`node:test`'s `mock.fn` creates a **spy** — a fake function that records how it was
called. This is why **dependency injection** matters: pass collaborators in, and a test
can substitute a mock:

```ts
import { mock } from "node:test";

const getName = mock.fn((id: number) => "Ada");
greetUser(1, getName);

getName.mock.callCount();             // 1
getName.mock.calls[0].arguments;      // [1]
```

> Run with coverage anytime: `node --import tsx --test --experimental-test-coverage ...`

---

## Exercises

Open [`src/exercises.ts`](./src/exercises.ts) and implement each `// TODO`. The functions
take their collaborators as **parameters** so the tests can mock them. Then run:

```bash
node --import tsx --test "blocks/18-testing-in-depth/tests/*.test.ts"
```

1. `greetUser(id, getName)` — return `"Hello, <name>!"` using the injected `getName`.
2. `parsePositive(input)` — return a positive number, or **throw**
   `"not a positive number"`.
3. `sumTwice(load)` — `await` the async `load` twice and return the sum.

Then compare with [`solutions/`](./solutions) and read how the tests mock these.
