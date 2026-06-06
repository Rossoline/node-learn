// Block 13 — Router & Middleware: worked examples
// Run me:  npm run play blocks/13-router-and-middleware/src/examples.ts
export {}; // make this a module so top-level names don't clash across blocks

import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import type { AddressInfo } from "node:net";

type Handler = (req: IncomingMessage, res: ServerResponse) => void | Promise<void>;

function withLogging(handler: Handler, log: (line: string) => void): Handler {
  return async (req, res) => {
    log(`${req.method} ${req.url}`);
    await handler(req, res);
  };
}

const hello: Handler = (_req, res) => {
  res.end("hello from a composed handler");
};

const server = createServer(withLogging(hello, (line) => console.log("LOG:", line)));

server.listen(0, async () => {
  const { port } = server.address() as AddressInfo;
  const res = await fetch(`http://localhost:${port}/demo`);
  console.log("response:", await res.text());
  server.close();
});
