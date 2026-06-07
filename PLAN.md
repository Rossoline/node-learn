# 📅 The 4-Week Plan

**English** · [Українська](./PLAN.uk.md)

**Goal:** Become comfortable building real, idiomatic Node.js in strict TypeScript — from
the runtime fundamentals up to a small HTTP API and CLI.

**Assumptions:** You know basic JavaScript and a little TypeScript (annotations,
interfaces, generics at a surface level — see the sibling
[TypeScript in a Month](https://github.com/Rossoline/typescript-learn) course). You can
dedicate **3–4 hours per day**, ~5 study days per week. **Node 22+** required.

**Pace:** One block per study day (~3 hours): **45–60 min reading** the README +
examples, **90–120 min** on exercises, **15–30 min** reviewing solutions and committing.
Weeks have a built-in slack day for review or catch-up.

**How to measure progress:** A block is "done" when (1) all its tests pass
(`npm test`) and (2) `npm run typecheck` reports no errors. Commit after every block.

---

## Week 1 — Node Foundations
*From "JS in the browser" to "JS on the server".*

### Block 01 — Getting Started
- What Node.js is; the runtime vs the browser; running TypeScript with `tsx`.
- Your first `node:test`; `process.argv`, `process.env`, `console`.
- **Exercises:** a typed greeting, parse `argv` into user args, read env with a fallback.

### Block 02 — Modules & npm
- ES modules vs CommonJS; named & default exports; the `node:` import specifier.
- `package.json`, `"type": "module"`, npm scripts, dependencies.
- **Exercises:** use `node:os`/`node:crypto` built-ins via `import`.

### Block 03 — Paths & Locations
- `node:path` (join/resolve/basename/extname); `import.meta.url`; `node:url`.
- Why `__dirname` needs recreating in ESM.
- **Exercises:** build cross-platform paths, derive a file's directory in ESM.

### Block 04 — Async in Node
- The event loop intuition; promises, `async`/`await`; `util.promisify`.
- `setTimeout`/`setImmediate`/`queueMicrotask` ordering.
- **Exercises:** promisify a callback API, sequence vs parallelize, a typed delay.

### Block 05 — Errors & the Process
- Error handling, error-first callbacks, custom `Error` subclasses.
- `process.exit` & exit codes; `uncaughtException`/`unhandledRejection` (briefly).
- **Exercises:** a `Result`-style wrapper, map errors to exit codes.

**Week 1 review day:** redo failing tests; re-read blocks 02 and 04.

---

## Week 2 — System I/O
*Reading, writing, and streaming data.*

### Block 06 — Reading Files
- `node:fs/promises`: `readFile`, `readdir`, `stat`; encodings; reading JSON.
- **Exercises:** read a text file, list a directory, load & parse a JSON config.

### Block 07 — Writing Files
- `writeFile`, `appendFile`, `mkdir`, `rm`, `rename`; ensuring directories.
- **Exercises:** write JSON, append a log line, a safe "write to temp then rename".

### Block 08 — Streams
- `Readable`/`Writable`/`Transform`; `pipe`, `pipeline`; backpressure.
- **Exercises:** transform a stream line-by-line, count bytes through a pipe.

### Block 09 — Events
- `EventEmitter`: `on`/`once`/`emit`; the `error` event; typed event maps.
- **Exercises:** a typed emitter, a one-shot waiter, an event-counting helper.

### Block 10 — Buffers & Encoding
- `Buffer`, `utf8`/`hex`/`base64`; text vs binary; `TextEncoder`.
- **Exercises:** encode/decode base64, concatenate buffers, measure byte length.

**Week 2 review day:** combine fs + streams in a tiny "copy & transform" tool.

---

## Week 3 — Building an HTTP Service
*From request to response.*

### Block 11 — HTTP Server Basics
- `node:http` `createServer`; `req`/`res`; methods, headers, status codes.
- **Exercises:** route by method/path, send text and JSON responses.

### Block 12 — Requests & JSON APIs
- Parse the URL & query, read a JSON request body, content types.
- **Exercises:** parse a body, build a typed JSON handler, proper status codes.

### Block 13 — A Tiny Router & Middleware
- Compose handlers; a middleware chain; 404/500; request logging.
- **Exercises:** a minimal router, a logging middleware, an error boundary.

### Block 14 — Config & Environment
- `process.env`, loading `.env`, validating and typing config.
- **Exercises:** a typed `loadConfig`, defaults + required vars, fail-fast validation.

### Block 15 — A File-Backed Data Store
- JSON persistence; a typed repository module; concurrency caveats.
- **Exercises:** a `Store` that loads/saves JSON, CRUD over a file.

**Week 3 review day:** wire the router to the store into a mini JSON API.

---

## Week 4 — Practical Node & Capstone
*Shipping real tools.*

### Block 16 — Child Processes
- `exec`/`execFile`/`spawn`; capturing stdout/stderr; exit codes.
- **Exercises:** run a command and capture output, stream a long-running process.

### Block 17 — CLI Tools
- Parsing `argv` (and `node:util` `parseArgs`); stdin/stdout; flags; exit codes.
- **Exercises:** a typed flag parser, a pipe-friendly filter, `--help` output.

### Block 18 — Testing in Depth
- `node:test`: `describe`/`it`, setup/teardown, mocks & spies, async, coverage.
- **Exercises:** mock a dependency, test async code, assert on thrown errors.

### Block 19 — Packaging & Scripts
- `package.json` `bin`, npm scripts, semver, `exports`, publishing basics.
- **Exercises:** add a `bin` entry, wire npm scripts, validate a `package.json` shape.

### Block 20 — Capstone Project
- Build a small **typed task manager**: a file-backed store exposed through **both an
  HTTP API and a CLI**, with `Result`-style errors and a full passing test suite.
- **Deliverable:** all tests green, zero type errors, committed to your fork.

**Week 4 review day:** polish the capstone, write its README, push to GitHub.

---

## After the month
You'll be ready for: Express/Fastify, real databases, building and publishing CLI tools,
and reading Node's docs fluently. Keep `strict` on, always.
