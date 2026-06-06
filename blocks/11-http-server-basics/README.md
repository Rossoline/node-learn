# Block 11 — HTTP Server Basics

Node can be a web server with no framework — just `node:http`.

## A minimal server

```ts
import { createServer } from "node:http";

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello!");
});

server.listen(3000, () => console.log("listening on http://localhost:3000"));
```

The callback runs for **every request** with two objects:

- **`req`** (`IncomingMessage`) — `req.method` (`"GET"`, `"POST"`, …) and `req.url`
  (the path + query, e.g. `"/health?x=1"`).
- **`res`** (`ServerResponse`) — set `res.statusCode`, add headers with
  `res.setHeader`, and finish with `res.end(body)`.

## Status codes & responses

```ts
res.statusCode = 404;
res.setHeader("Content-Type", "text/plain");
res.end("Not Found");
```

Send JSON by setting the content type and stringifying:

```ts
res.statusCode = 200;
res.setHeader("Content-Type", "application/json");
res.end(JSON.stringify({ status: "ok" }));
```

> `res.end()` **must** be called exactly once per request, or the client hangs. Always
> `return` after responding so you don't fall through and write twice.

## Routing by method + path

A "router" is just branching on `req.method` and `req.url`:

```ts
if (req.method === "GET" && req.url === "/") { /* ... */ }
```

---

## Exercises

Open [`src/exercises.ts`](./src/exercises.ts) and implement each `// TODO` with
`node:http`. Then run:

```bash
node --import tsx --test "blocks/11-http-server-basics/tests/*.test.ts"
```

1. `sendJson(res, status, data)` — set the status + `application/json` header and end the
   response with `JSON.stringify(data)`.
2. `handleRequest(req, res)` — route:
   - `GET /` → `200` text `"Hello, Node HTTP!"`
   - `GET /health` → `200` JSON `{ status: "ok" }` (use `sendJson`)
   - anything else → `404` text `"Not Found"`

(The tests start the server on a random port and make real requests with `fetch`.)
Then compare with [`solutions/`](./solutions).
