// Block 13 — Exercises
// Run tests:  node --import tsx --test "blocks/13-router-and-middleware/tests/*.test.ts"
import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
  type Server,
} from "node:http";

export type Handler = (
  req: IncomingMessage,
  res: ServerResponse,
) => void | Promise<void>;

// 1. A tiny router. Register handlers by method + path, then dispatch.
export class Router {
  private routes = new Map<string, Handler>();

  get(path: string, handler: Handler): void {
    void path;
    void handler;
    void this.routes; // remove these lines once you implement this
    // TODO: this.routes.set(`GET ${path}`, handler)
    throw new Error("Not implemented");
  }

  post(path: string, handler: Handler): void {
    void path;
    void handler;
    void this.routes; // remove these lines once you implement this
    // TODO: this.routes.set(`POST ${path}`, handler)
    throw new Error("Not implemented");
  }

  async handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
    void req;
    void res;
    void this.routes; // remove these lines once you implement this
    // TODO: look up `${req.method} ${pathname}`; call it, or 404 JSON { error: "not found" }
    throw new Error("Not implemented");
  }
}

// 2. Middleware: log "<METHOD> <url>", then delegate to the wrapped handler.
export function withLogging(
  handler: Handler,
  log: (line: string) => void,
): Handler {
  void handler;
  void log; // remove these lines once you use the parameters
  // TODO: return async (req, res) => { log(`${req.method} ${req.url}`); await handler(req, res); }
  throw new Error("Not implemented");
}

// Given: builds a server from your router, turning thrown errors into a 500.
export function makeServer(router: Router): Server {
  return createServer((req, res) => {
    router.handle(req, res).catch(() => {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "server error" }));
    });
  });
}
