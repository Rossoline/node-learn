# Блок 11 — Основи HTTP-сервера

[English](./README.md) · **Українська**

> ℹ️ Джерело істини — англійська версія ([README.md](./README.md)); український переклад може незначно відставати.

Node може бути веб-сервером без жодного фреймворку — лише `node:http`.

## Мінімальний сервер

```ts
import { createServer } from "node:http";

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello!");
});

server.listen(3000, () => console.log("listening on http://localhost:3000"));
```

Колбек виконується для **кожного запиту** з двома обʼєктами:

- **`req`** (`IncomingMessage`) — `req.method` (`"GET"`, `"POST"`, …) і `req.url`
  (шлях + query, напр. `"/health?x=1"`).
- **`res`** (`ServerResponse`) — встанови `res.statusCode`, додай заголовки через
  `res.setHeader` і заверши через `res.end(body)`.

## Статус-коди та відповіді

```ts
res.statusCode = 404;
res.setHeader("Content-Type", "text/plain");
res.end("Not Found");
```

Надішли JSON, встановивши тип контенту й серіалізувавши:

```ts
res.statusCode = 200;
res.setHeader("Content-Type", "application/json");
res.end(JSON.stringify({ status: "ok" }));
```

> `res.end()` **має** викликатися рівно один раз на запит, інакше клієнт зависне. Завжди
> `return` після відповіді, щоб не провалитися далі й не записати двічі.

## Маршрутизація за методом + шляхом

«Роутер» — це просто розгалуження за `req.method` і `req.url`:

```ts
if (req.method === "GET" && req.url === "/") { /* ... */ }
```

---

## Вправи

Відкрий [`src/exercises.ts`](./src/exercises.ts) і реалізуй кожен `// TODO` через
`node:http`. Потім запусти:

```bash
node --import tsx --test "blocks/11-http-server-basics/tests/*.test.ts"
```

1. `sendJson(res, status, data)` — встановити статус + заголовок `application/json` і
   завершити відповідь через `JSON.stringify(data)`.
2. `handleRequest(req, res)` — маршрутизація:
   - `GET /` → `200` текст `"Hello, Node HTTP!"`
   - `GET /health` → `200` JSON `{ status: "ok" }` (використай `sendJson`)
   - будь-що інше → `404` текст `"Not Found"`

(Тести стартують сервер на випадковому порту й роблять справжні запити через `fetch`.)
Потім порівняй з [`solutions/`](./solutions).
