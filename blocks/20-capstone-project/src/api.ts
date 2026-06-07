// Capstone — HTTP API over the task store.
import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
  type Server,
} from "node:http";
import type { TaskStore } from "./store.ts";

// Given: JSON response helper.
export function sendJson(res: ServerResponse, status: number, data: unknown): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

// 4a. Route the request:
//     GET  /tasks  -> 200 JSON array of all tasks
//     POST /tasks  -> read JSON body { title }, add it, 201 JSON the new task
//     otherwise    -> 404 JSON { error: "not found" }
export async function handleRequest(
  store: TaskStore,
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  void store;
  void req;
  void res; // remove these lines once you use the parameters
  // TODO: branch on method + pathname; use sendJson; read the body for POST
  throw new Error("Not implemented");
}

// Given: builds the server, turning thrown errors into a 500.
export function makeServer(store: TaskStore): Server {
  return createServer((req, res) => {
    handleRequest(store, req, res).catch(() => {
      sendJson(res, 500, { error: "server error" });
    });
  });
}
