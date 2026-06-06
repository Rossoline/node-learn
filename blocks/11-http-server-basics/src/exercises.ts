// Block 11 — Exercises
// Run tests:  node --import tsx --test "blocks/11-http-server-basics/tests/*.test.ts"
import { createServer, type IncomingMessage, type ServerResponse, type Server } from "node:http";

// 1. Send a JSON response: set the status code, the application/json content type,
//    and end with the stringified data.
export function sendJson(
  res: ServerResponse,
  status: number,
  data: unknown,
): void {
  void res;
  void status;
  void data; // remove these lines once you use the parameters
  // TODO: res.statusCode = status; setHeader Content-Type; res.end(JSON.stringify(data))
  throw new Error("Not implemented");
}

// 2. Route the request:
//    GET /        -> 200 text "Hello, Node HTTP!"
//    GET /health  -> 200 JSON { status: "ok" }   (use sendJson)
//    otherwise    -> 404 text "Not Found"
export function handleRequest(req: IncomingMessage, res: ServerResponse): void {
  void req;
  void res; // remove these lines once you use the parameters
  // TODO: branch on req.method and req.url; remember to res.end() exactly once
  throw new Error("Not implemented");
}

// Given: builds a server from your handler (used by the tests).
export function makeServer(): Server {
  return createServer((req, res) => handleRequest(req, res));
}
