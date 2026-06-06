# CLAUDE.md — Authoring guide for this course

This repo is **"Node.js in a Month"**: 20 hands-on, test-driven blocks under
[`blocks/`](./blocks), written in **TypeScript** and tested with the **built-in
`node:test`** runner. The day-by-day curriculum is in [PLAN.md](./PLAN.md).

Blocks `01` and `02` are the **reference implementation** of the template below.
When generating or editing any block (03–20), match them exactly.

## Block file layout

Every block folder `blocks/NN-name/` contains **exactly** these files:

```
blocks/NN-name/
  README.md                            # theory + the list of exercises
  src/examples.ts                      # runnable worked examples (npm run play <file>)
  src/exercises.ts                     # student stubs: throw "Not implemented"
  tests/exercises.test.ts              # student-facing tests  (npm test)
  solutions/exercises.solution.ts      # reference answers
  solutions/exercises.solution.test.ts # solution check (npm run test:solutions)
```

Module-heavy blocks (e.g. a small multi-file app) may use several `src/*.ts` files plus
an `index.ts`; mirror them under `solutions/`. See how the TypeScript sibling course did
blocks 15/20 if needed.

## Conventions (follow per file)

- **`src/exercises.ts`** — each task is an `export function` with **fully annotated
  parameters and return type already filled in**; the body is a stub:
  ```ts
  export function add(a: number, b: number): number {
    void a;
    void b; // remove these lines once you use the parameters
    // TODO: return a + b
    throw new Error("Not implemented");
  }
  ```
  The `void x;` lines are required because `noUnusedParameters` is on. Keep a short
  `// TODO:` hint describing the intended implementation.

- **`solutions/exercises.solution.ts`** — the working implementation, same signatures,
  plus a short `// Notes:` comment block explaining the *why* (the Node lesson).

- **Tests use `node:test` + `node:assert/strict`** (NOT Vitest):
  ```ts
  import { test } from "node:test";
  import assert from "node:assert/strict";
  import { add } from "../src/exercises.ts";

  test("add sums two numbers", () => {
    assert.equal(add(2, 3), 5);
  });
  ```
  Group related cases with `describe`/`it` from `node:test` when helpful. Async tests:
  make the callback `async` and `await`; for rejections use
  `await assert.rejects(promise, /message/)`.

- **Imports in tests/solutions carry the `.ts` extension** (`../src/exercises.ts`).
  Node's test runner + tsx resolve the real file; tsc (Bundler resolution) accepts it.

- **`solutions/exercises.solution.test.ts`** imports from `./exercises.solution.ts` and
  duplicates the same cases — the **author/CI guarantee** that the reference answers
  pass. It is **excluded** from `npm test` (which globs only `blocks/**/tests/*.test.ts`).

- **`src/examples.ts`** — start with `export {};` so it's a module (prevents top-level
  names clashing across blocks). Make it runnable: `npm run play blocks/NN/src/examples.ts`.

- **`README.md`** — explain the topic with small code samples and `// ❌` error examples,
  then a numbered `## Exercises` list matching the functions in `src/exercises.ts`. End by
  pointing at `solutions/`. A `README.uk.md` Ukrainian translation is added later (English
  is the source of truth); link the two with a `**English** · [Українська]` switcher.

## Verifying a block (definition of done)

```bash
npm run typecheck          # tsc --noEmit, zero errors (covers blocks/**/*.ts)
npm run test:solutions     # the reference solutions are GREEN
```

`npm test` (student run) shows the new block's exercises **failing** with
`Not implemented` — that is correct and expected; the student makes them green.

## Config notes (don't regress these)

- Node **22+** is required (`node:test` glob support + `node --import tsx`).
- `package.json` scripts:
  - `test` → `node --import tsx --test "blocks/**/tests/*.test.ts"` (student run).
  - `test:solutions` → same but `blocks/**/solutions/*.solution.test.ts`.
  - `typecheck` → `tsc --noEmit`. `play` → `tsx` (run any file).
- `tsconfig.json` is strict, incl. `noUncheckedIndexedAccess` and `noUnusedParameters`.
  Indexing an array yields `T | undefined`; use `!` (with a comment) where presence is
  guaranteed. `lib` is `ES2022` only (no DOM) and `types: ["node"]`.
- Tests that touch `process.env` must save/restore it (use `beforeEach`/`afterEach` or
  restore in a `finally`) so they don't leak into other tests.
- HTTP/server tests: `listen(0)` for a random port, `fetch` against it, and `close()` in
  an `after` hook so the process exits.
- If a stub class has **given** (pre-implemented) members the throwing stubs don't call
  yet (e.g. `load`/`save` in block 15), reference them with `void this.x;` in a stub so
  `noUnusedLocals` (TS6133) stays happy until the student wires them up.
- Workflow: commit & push to **`dev`**; the user merges `dev` → `main`. Commits are
  authored as the user alone (no Co-Authored-By / AI mention).
