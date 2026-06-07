# Block 13 — A Tiny Router & Middleware

**English** · [Українська](./README.uk.md)

Frameworks like Express are, at heart, a **router** (match method + path → handler) plus
**middleware** (functions that wrap handlers). Let's build a tiny version.

## A router

Store handlers keyed by `"METHOD /path"`, then look one up per request:

```ts
type Handler = (req: IncomingMessage, res: ServerResponse) => void | Promise<void>;

class Router {
  private routes = new Map<string, Handler>();
  get(path: string, h: Handler) {
    this.routes.set(`GET ${path}`, h);
  }
  async handle(req: IncomingMessage, res: ServerResponse) {
    const { pathname } = new URL(req.url ?? "", "http://localhost");
    const handler = this.routes.get(`${req.method} ${pathname}`);
    if (!handler) {
      /* 404 */ return;
    }
    await handler(req, res);
  }
}
```

## Middleware

Middleware is a function that takes a handler and returns a **new** handler — doing
something before/after (logging, auth, timing) and delegating to the original:

```ts
function withLogging(handler: Handler, log: (line: string) => void): Handler {
  return async (req, res) => {
    log(`${req.method} ${req.url}`);
    await handler(req, res);
  };
}
```

Wrapping composes: `withAuth(withLogging(handler, log))`.

## Error boundary (500)

If a handler throws, something must turn that into a `500` instead of a hung request.
Wrap the dispatch in a `try/catch` (or `.catch()`), as `makeServer` does here.

---

## Exercises

Open [`src/exercises.ts`](./src/exercises.ts) and implement each `// TODO`. Then run:

```bash
node --import tsx --test "blocks/13-router-and-middleware/tests/*.test.ts"
```

1. `Router` — implement `get(path, h)`, `post(path, h)`, and `handle(req, res)`
   (dispatch, or `404` JSON `{ error: "not found" }`).
2. `withLogging(handler, log)` — middleware that calls `log("<METHOD> <url>")` then
   delegates to `handler`.

(`makeServer` wraps your router and turns thrown errors into `500`. Tests use `fetch`.)
Then compare with [`solutions/`](./solutions).
