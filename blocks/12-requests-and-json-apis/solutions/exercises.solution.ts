// Block 12 — Reference solutions
// Try the exercises yourself first! Read this only to check your work.
import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
  type Server,
} from "node:http";

export function sendJson(res: ServerResponse, status: number, data: unknown): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

export function parseQuery(url: string): Record<string, string> {
  const { searchParams } = new URL(url, "http://localhost");
  const out: Record<string, string> = {};
  for (const [key, value] of searchParams) {
    out[key] = value;
  }
  return out;
}

export async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
  }
  return JSON.parse(raw);
}

export async function handleRequest(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const url = new URL(req.url ?? "", "http://localhost");

  if (req.method === "GET" && url.pathname === "/search") {
    sendJson(res, 200, { params: parseQuery(req.url ?? "") });
    return;
  }
  if (req.method === "POST" && url.pathname === "/echo") {
    const body = await readJsonBody(req);
    sendJson(res, 200, { echo: body });
    return;
  }
  sendJson(res, 404, { error: "not found" });
}

export function makeServer(): Server {
  return createServer((req, res) => {
    handleRequest(req, res).catch(() => {
      sendJson(res, 500, { error: "server error" });
    });
  });
}

// Notes:
// - `new URL(req.url, "http://localhost")` parses a relative request URL; searchParams
//   iterates the query pairs.
// - The body is a stream; we accumulate chunks then JSON.parse. A real server would also
//   limit the body size and return 400 on invalid JSON instead of throwing.
// - makeServer wraps the async handler and converts any rejection into a 500.
