// Block 09 — Events: worked examples
// Run me:  npm run play blocks/09-events/src/examples.ts
export {}; // make this a module so top-level names don't clash across blocks

import { EventEmitter, once } from "node:events";

const bus = new EventEmitter();

// Always handle "error" or an emit can crash the process.
bus.on("error", (err) => console.error("handled error:", (err as Error).message));

bus.on("message", (text: string) => console.log("on message:", text));
bus.once("ready", () => console.log("ready (once)"));

bus.emit("ready");
bus.emit("ready"); // ignored — once() already fired
bus.emit("message", "hello");
bus.emit("message", "again");

async function main() {
  // Await the next "data" event.
  setTimeout(() => bus.emit("data", 42), 10);
  const [value] = await once(bus, "data");
  console.log("awaited data:", value);

  bus.emit("error", new Error("boom")); // handled above, no crash
}

void main();
