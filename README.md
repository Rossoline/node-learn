# Node.js in a Month 🟢

**English** · [Українська](./README.uk.md)

> Learn **Node.js** the way you actually get good at it: by building. 20 hands-on,
> **test-driven** blocks in strict **TypeScript**, tested with Node's **built-in**
> `node:test` runner — no test framework to install.

[![Node 22+](https://img.shields.io/badge/Node-22%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tested with node:test](https://img.shields.io/badge/tested%20with-node%3Atest-339933?logo=node.js&logoColor=white)](https://nodejs.org/api/test.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Use this template](https://img.shields.io/badge/Use%20this%20template-2ea44f?logo=github&logoColor=white)](https://github.com/Rossoline/node-learn/generate)

A complete, free course for **JavaScript/TypeScript developers learning the Node.js
runtime** — modules, the filesystem, streams, events, HTTP servers, CLIs, and more. You
don't read about APIs; you implement functions, make failing tests pass, and keep the
compiler happy under `strict`.

> 🧩 Pairs with the sibling course
> **[TypeScript in a Month](https://github.com/Rossoline/typescript-learn)** — learn the
> type system there, learn the runtime here.

## Why this course

- 🧪 **Test-driven** — every block ships failing `node:test` tests; you make them green.
- 🟢 **Zero test deps** — uses Node's built-in test runner and `assert`, so you learn the
  platform, not a framework.
- 🔒 **Strict TypeScript** — `strict`, `noUncheckedIndexedAccess`, and friends, run via
  `tsx` (no build step).
- ✅ **Verified solutions** — every reference answer is itself tested
  (`npm run test:solutions`).
- 🛠️ **Real-world arc** — fundamentals → fs/streams/events → an HTTP API → a CLI capstone.

## Use this template

This is a GitHub **template repository** — click **[Use this template](https://github.com/Rossoline/node-learn/generate)**
to get your own copy to commit solutions to.

---

## Quick start

```bash
# 1. Create your copy (Use this template) or clone
git clone https://github.com/Rossoline/node-learn.git
cd node-learn

# 2. Install dev dependencies (Node 22+ required)
npm install

# 3. Run all tests — most fail until you solve the exercises
npm test

# 4. Type-check the whole project
npm run typecheck
```

### Recommended workflow per block

1. Read the block's `README.md`.
2. Run its `src/examples.ts` to see the ideas in action:
   ```bash
   npm run play blocks/01-getting-started/src/examples.ts
   ```
3. Implement each `// TODO` in `src/exercises.ts`.
4. Run that block's tests until green:
   ```bash
   node --import tsx --test "blocks/01-getting-started/tests/*.test.ts"
   ```
5. Type-check, then compare with `solutions/`.

---

## What's in each block

```
blocks/NN-topic/
├── README.md          # the topic explained, with examples and the exercise list
├── src/examples.ts    # runnable, worked examples
├── src/exercises.ts   # practice tasks with // TODO stubs — your job
├── tests/             # node:test tests — make them pass
└── solutions/         # reference solutions (try the exercises first!)
```

## Curriculum at a glance

The full day-by-day plan is in **[PLAN.md](./PLAN.md)**. Twenty blocks across four weeks:

| Week | Theme | Blocks |
|------|-------|--------|
| 1 | Node Foundations | 01 Getting Started · 02 Modules & npm · 03 Paths & Locations · 04 Async in Node · 05 Errors & the Process |
| 2 | System I/O | 06 Reading Files · 07 Writing Files · 08 Streams · 09 Events · 10 Buffers & Encoding |
| 3 | HTTP Service | 11 HTTP Server Basics · 12 Requests & JSON APIs · 13 Router & Middleware · 14 Config & Environment · 15 File-Backed Store |
| 4 | Practical Node | 16 Child Processes · 17 CLI Tools · 18 Testing in Depth · 19 Packaging & Scripts · 20 Capstone Project |

## Scripts

| Command | What it does |
|---------|--------------|
| `npm test` | Run every block's tests (your progress). |
| `npm run typecheck` | Type-check the whole project (`tsc --noEmit`). |
| `npm run test:solutions` | Verify the reference solutions all pass. |
| `npm run play <file>` | Run any `.ts` file with `tsx`. |

---

## How testing works

Each exercise file exports functions; the matching test imports them and asserts behavior
with `node:test` + `node:assert/strict`. Implement a `// TODO` correctly and its test goes
green — under `strict`, with the compiler on your side.

If this helped you learn Node, please ⭐ the repo. **Happy building!** 🛠️
