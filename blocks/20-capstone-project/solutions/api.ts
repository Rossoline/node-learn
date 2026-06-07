// Capstone solution — HTTP API over the task store.
import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
  type Server,
} from "node:http";
import type { TaskStore } from "./store.ts";

export function sendJson(res: ServerResponse, status: number, data: unknown): void {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

export async function handleRequest(
  store: TaskStore,
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const url = new URL(req.url ?? "", "http://localhost");

  if (req.method === "GET" && url.pathname === "/tasks") {
    sendJson(res, 200, await store.all());
    return;
  }
  if (req.method === "POST" && url.pathname === "/tasks") {
    let raw = "";
    for await (const chunk of req) raw += chunk;
    const { title } = JSON.parse(raw) as { title: string };
    const task = await store.add(title);
    sendJson(res, 201, task);
    return;
  }
  sendJson(res, 404, { error: "not found" });
}

export function makeServer(store: TaskStore): Server {
  return createServer((req, res) => {
    handleRequest(store, req, res).catch(() => {
      sendJson(res, 500, { error: "server error" });
    });
  });
}

// Notes:
// - The API is a thin layer over the store: parse the request, call a store method,
//   send JSON. makeServer turns any rejection into a 500.
