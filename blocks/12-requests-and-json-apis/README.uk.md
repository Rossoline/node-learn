# Блок 12 — Запити та JSON API

[English](./README.md) · **Українська**

> ℹ️ Джерело істини — англійська версія ([README.md](./README.md)); український переклад може незначно відставати.

JSON API потребує двох речей, яких сирий сервер не дає задарма: **розпарсений URL**
(шлях + query) і **тіло запиту**.

## Парсинг URL та query

`req.url` — це рядок на кшталт `"/search?q=node&limit=5"`. Розпарс його через WHATWG `URL`
(дай йому фіктивну базу, бо `req.url` відносний):

```ts
const url = new URL(req.url ?? "", "http://localhost");
url.pathname;               // "/search"
url.searchParams.get("q");  // "node"
```

## Читання тіла запиту

Тіло надходить як **потік** порцій. Збери його, тоді розпарс:

```ts
async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  let raw = "";
  for await (const chunk of req) raw += chunk;
  return JSON.parse(raw);
}
```

(Справжні сервери також обмежують розмір і обробляють некоректний JSON — див. нотатки в
рішенні.)

## Надсилання JSON та статус-коди

```ts
function sendJson(res: ServerResponse, status: number, data: unknown): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}
```

Використовуй правильний статус: `200` OK, `201` Created, `400` Bad Request, `404` Not
Found, `500` Server Error.

---

## Вправи

Відкрий [`src/exercises.ts`](./src/exercises.ts) і реалізуй кожен `// TODO`. Потім запусти:

```bash
node --import tsx --test "blocks/12-requests-and-json-apis/tests/*.test.ts"
```

1. `parseQuery(url)` — повернути параметри query як `Record<string, string>`.
2. `readJsonBody(req)` — зібрати потік запиту й `JSON.parse`-нути його.
3. `handleRequest(req, res)` — маршрутизація:
   - `GET /search?...` → `200` JSON `{ params: <розпарсений query> }`
   - `POST /echo` (JSON-тіло) → `200` JSON `{ echo: <тіло> }`
   - будь-що інше → `404` JSON `{ error: "not found" }`

(`sendJson` і `makeServer` надані. Тести використовують справжній `fetch`.) Потім порівняй з
[`solutions/`](./solutions).
