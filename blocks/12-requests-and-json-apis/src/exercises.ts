// Block 12 — Exercises
// Run tests:  node --import tsx --test "blocks/12-requests-and-json-apis/tests/*.test.ts"
import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
  type Server,
} from "node:http";

// Given: send a JSON response (from block 11).
export function sendJson(res: ServerResponse, status: number, data: unknown): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

// 1. Return the URL's query parameters as a plain object.
//    e.g. "/search?q=node&limit=5" -> { q: "node", limit: "5" }
export function parseQuery(url: string): Record<string, string> {
  void url; // remove this line once you use the parameter
  // TODO: new URL(url, "http://localhost").searchParams -> object
  throw new Error("Not implemented");
}

// 2. Collect the request body stream and JSON.parse it.
export async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  void req; // remove this line once you use the parameter
  // TODO: for await (const chunk of req) accumulate, then JSON.parse
  throw new Error("Not implemented");
}

// 3. Route the request (see the README for the exact responses).
export async function handleRequest(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  void req;
  void res; // remove these lines once you use the parameters
  // TODO: GET /search -> { params }, POST /echo -> { echo }, else 404 { error }
  throw new Error("Not implemented");
}

// Given: builds a server from your async handler (used by the tests).
export function makeServer(): Server {
  return createServer((req, res) => {
    handleRequest(req, res).catch(() => {
      sendJson(res, 500, { error: "server error" });
    });
  });
}
