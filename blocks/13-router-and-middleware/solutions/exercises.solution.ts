// Block 13 — Reference solutions
// Try the exercises yourself first! Read this only to check your work.
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

export class Router {
  private routes = new Map<string, Handler>();

  get(path: string, handler: Handler): void {
    this.routes.set(`GET ${path}`, handler);
  }

  post(path: string, handler: Handler): void {
    this.routes.set(`POST ${path}`, handler);
  }

  async handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const { pathname } = new URL(req.url ?? "", "http://localhost");
    const handler = this.routes.get(`${req.method} ${pathname}`);
    if (!handler) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "not found" }));
      return;
    }
    await handler(req, res);
  }
}

export function withLogging(
  handler: Handler,
  log: (line: string) => void,
): Handler {
  return async (req, res) => {
    log(`${req.method} ${req.url}`);
    await handler(req, res);
  };
}

export function makeServer(router: Router): Server {
  return createServer((req, res) => {
    router.handle(req, res).catch(() => {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "server error" }));
    });
  });
}

// Notes:
// - The route key `"GET /path"` makes lookup a single Map.get; unknown keys -> 404.
// - withLogging returns a NEW handler that runs a side effect then delegates — the
//   essence of middleware. Wrappers compose: withAuth(withLogging(handler)).
// - handle() is async and awaits the handler, so makeServer can catch rejections as 500.
