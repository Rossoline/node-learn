// Block 12 — Requests & JSON APIs: worked examples
// Run me:  npm run play blocks/12-requests-and-json-apis/src/examples.ts
export {}; // make this a module so top-level names don't clash across blocks

import { createServer } from "node:http";
import type { AddressInfo } from "node:net";

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "", "http://localhost");

  if (req.method === "POST" && url.pathname === "/echo") {
    let raw = "";
    for await (const chunk of req) raw += chunk;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ echo: JSON.parse(raw) }));
    return;
  }

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ path: url.pathname, q: url.searchParams.get("q") }));
});

server.listen(0, async () => {
  const { port } = server.address() as AddressInfo;
  const base = `http://localhost:${port}`;

  const search = await fetch(`${base}/search?q=node`);
  console.log("GET /search?q=node ->", await search.json());

  const echo = await fetch(`${base}/echo`, {
    method: "POST",
    body: JSON.stringify({ hello: "world" }),
  });
  console.log("POST /echo ->", await echo.json());

  server.close();
});
