// Verifies the reference solution. Run with:  npm run test:solutions
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { onceValue, collectEvents, TypedBus } from "./exercises.solution.ts";

describe("Block 09 — solution", () => {
  test("onceValue resolves with the first payload", async () => {
    const em = new EventEmitter();
    setTimeout(() => em.emit("data", 42), 5);
    assert.equal(await onceValue<number>(em, "data"), 42);
  });

  test("collectEvents accumulates payloads", () => {
    const em = new EventEmitter();
    const get = collectEvents(em, "tick");
    assert.deepEqual(get(), []);
    em.emit("tick", 1);
    em.emit("tick", 2);
    em.emit("other", 99);
    assert.deepEqual(get(), [1, 2]);
  });

  test("TypedBus delivers typed events", () => {
    const bus = new TypedBus();
    let lastText = "";
    let sum = 0;
    bus.on("message", (text) => {
      lastText = text;
    });
    bus.on("count", (n) => {
      sum += n;
    });
    bus.emit("message", "hello");
    bus.emit("count", 3);
    bus.emit("count", 4);
    assert.equal(lastText, "hello");
    assert.equal(sum, 7);
  });
});
