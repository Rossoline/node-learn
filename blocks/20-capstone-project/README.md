# Block 20 — Capstone Project

Bring it all together: a **typed task manager** that persists to a JSON file and is driven
by **both an HTTP API and a CLI** — sharing the same store and the same `Result` errors.

## The modules (under [`src/`](./src))

- **`result.ts`** — `Result<T, E>` plus `ok()` / `err()` (blocks 05, 17).
- **`task.ts`** — the `Task` type and pure helpers `createTask` / `completeTask`.
- **`store.ts`** — `TaskStore`, a file-backed repository (`load`/`save` provided) with
  `all` / `add` / `complete` (blocks 06, 07, 15).
- **`api.ts`** — `handleRequest(store, req, res)`: `GET /tasks`, `POST /tasks`
  (blocks 11–13).
- **`cli.ts`** — `runCli(store, args)`: `list`, `add <title>`, `done <id>` (block 17).
- **`index.ts`** — the barrel re-exporting the public API (block 15... in TS terms).

## Behaviour

```
$ task add "Buy milk"   ->  added #1: Buy milk        (exit 0)
$ task list             ->  [ ] 1. Buy milk           (exit 0)
$ task done 1           ->  completed #1              (exit 0)
$ task done 99          ->  task 99 not found         (exit 1)

GET  /tasks             ->  200 [ { id, title, done } ]
POST /tasks {"title":…} ->  201 { id, title, done:false }
```

## Definition of done

```bash
node --import tsx --test "blocks/20-capstone-project/tests/*.test.ts"   # all green
npm run typecheck                                                       # no errors
```

---

## Exercises

Implement every `// TODO` across `src/`:

1. `ok` / `err` in `result.ts`.
2. `createTask` / `completeTask` in `task.ts`.
3. `TaskStore`'s `all` / `add` / `complete` in `store.ts` (`load`/`save` are provided).
4. `handleRequest` in `api.ts` and `runCli` in `cli.ts`.
5. The `index.ts` barrel re-exporting the public API.

Then compare with [`solutions/`](./solutions). Afterwards, write a short README for your
task manager — that's the capstone deliverable.
