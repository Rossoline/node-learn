# Блок 20 — Підсумковий проєкт (Capstone)

[English](./README.md) · **Українська**

> ℹ️ Джерело істини — англійська версія ([README.md](./README.md)); український переклад може незначно відставати.

Зведи все докупи: **типізований менеджер задач**, що зберігається у JSON-файл і керується
**і HTTP API, і CLI** — зі спільним сховищем і спільними помилками `Result`.

## Модулі (під [`src/`](./src))

- **`result.ts`** — `Result<T, E>` плюс `ok()` / `err()` (блоки 05, 17).
- **`task.ts`** — тип `Task` і чисті помічники `createTask` / `completeTask`.
- **`store.ts`** — `TaskStore`, файлове сховище (`load`/`save` надані) з `all` / `add` /
  `complete` (блоки 06, 07, 15).
- **`api.ts`** — `handleRequest(store, req, res)`: `GET /tasks`, `POST /tasks` (блоки 11–13).
- **`cli.ts`** — `runCli(store, args)`: `list`, `add <title>`, `done <id>` (блок 17).
- **`index.ts`** — barrel, що ре-експортує публічний API (блок 15… у термінах TS).

## Поведінка

```
$ task add "Buy milk"   ->  added #1: Buy milk        (exit 0)
$ task list             ->  [ ] 1. Buy milk           (exit 0)
$ task done 1           ->  completed #1              (exit 0)
$ task done 99          ->  task 99 not found         (exit 1)

GET  /tasks             ->  200 [ { id, title, done } ]
POST /tasks {"title":…} ->  201 { id, title, done:false }
```

## Критерій завершеності

```bash
node --import tsx --test "blocks/20-capstone-project/tests/*.test.ts"   # усе зелене
npm run typecheck                                                       # без помилок
```

---

## Вправи

Реалізуй кожен `// TODO` у `src/`:

1. `ok` / `err` у `result.ts`.
2. `createTask` / `completeTask` у `task.ts`.
3. `all` / `add` / `complete` у `TaskStore` (`store.ts`) (`load`/`save` надані).
4. `handleRequest` в `api.ts` і `runCli` у `cli.ts`.
5. Barrel `index.ts`, що ре-експортує публічний API.

Потім порівняй з [`solutions/`](./solutions). Опісля напиши короткий README для свого
менеджера задач — це і є фінальний результат capstone.
