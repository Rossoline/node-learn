# Block 12 — Requests & JSON APIs

A JSON API needs two things the raw server doesn't give you for free: the **parsed URL**
(path + query) and the **request body**.

## Parsing the URL & query

`req.url` is a string like `"/search?q=node&limit=5"`. Parse it with the WHATWG `URL`
(give it a dummy base, since `req.url` is relative):

```ts
const url = new URL(req.url ?? "", "http://localhost");
url.pathname;               // "/search"
url.searchParams.get("q");  // "node"
```

## Reading the request body

The body arrives as a **stream** of chunks. Collect it, then parse:

```ts
async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  let raw = "";
  for await (const chunk of req) raw += chunk;
  return JSON.parse(raw);
}
```

(Real servers also cap the size and handle malformed JSON — see the notes in the
solution.)

## Sending JSON & status codes

```ts
function sendJson(res: ServerResponse, status: number, data: unknown): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}
```

Use the right status: `200` OK, `201` Created, `400` Bad Request, `404` Not Found,
`500` Server Error.

---

## Exercises

Open [`src/exercises.ts`](./src/exercises.ts) and implement each `// TODO`. Then run:

```bash
node --import tsx --test "blocks/12-requests-and-json-apis/tests/*.test.ts"
```

1. `parseQuery(url)` — return the query parameters as a `Record<string, string>`.
2. `readJsonBody(req)` — collect the request stream and `JSON.parse` it.
3. `handleRequest(req, res)` — route:
   - `GET /search?...` → `200` JSON `{ params: <parsed query> }`
   - `POST /echo` (JSON body) → `200` JSON `{ echo: <body> }`
   - anything else → `404` JSON `{ error: "not found" }`

(`sendJson` and `makeServer` are provided. Tests use real `fetch`.) Then compare with
[`solutions/`](./solutions).
