// Block 11 — HTTP Server Basics: worked examples
// Run me:  npm run play blocks/11-http-server-basics/src/examples.ts
export {}; // make this a module so top-level names don't clash across blocks

import { createServer } from "node:http";
import type { AddressInfo } from "node:net";

const server = createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello!");
    return;
  }
  res.statusCode = 404;
  res.end("Not Found");
});

// Start on a random free port, make a couple of requests, then shut down.
server.listen(0, async () => {
  const { port } = server.address() as AddressInfo;
  console.log("listening on port", port);

  const ok = await fetch(`http://localhost:${port}/`);
  console.log("GET /:", ok.status, JSON.stringify(await ok.text()));

  const missing = await fetch(`http://localhost:${port}/nope`);
  console.log("GET /nope:", missing.status);

  server.close();
});
