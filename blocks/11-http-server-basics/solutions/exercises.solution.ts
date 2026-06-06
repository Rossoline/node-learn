// Block 11 — Reference solutions
// Try the exercises yourself first! Read this only to check your work.
import { createServer, type IncomingMessage, type ServerResponse, type Server } from "node:http";

export function sendJson(
  res: ServerResponse,
  status: number,
  data: unknown,
): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

export function handleRequest(req: IncomingMessage, res: ServerResponse): void {
  if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, Node HTTP!");
    return;
  }
  if (req.method === "GET" && req.url === "/health") {
    sendJson(res, 200, { status: "ok" });
    return;
  }
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Not Found");
}

export function makeServer(): Server {
  return createServer((req, res) => handleRequest(req, res));
}

// Notes:
// - Each branch ends the response exactly once and returns, so no path writes twice.
// - sendJson centralizes the status + content-type + JSON.stringify trio.
// - req.url includes the query string; here paths have none, so exact matching is fine
//   (block 12 parses URLs properly).
