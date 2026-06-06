import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { parseEnv, loadConfig } from "../src/exercises.ts";

describe("Block 14 — Config & Environment", () => {
  test("parseEnv parses lines, skipping comments and blanks", () => {
    const text = "# comment\nPORT=8080\nHOST=example.com\n\nDEBUG=true\n";
    assert.deepEqual(parseEnv(text), {
      PORT: "8080",
      HOST: "example.com",
      DEBUG: "true",
    });
  });

  test("parseEnv splits on the first = and trims", () => {
    assert.deepEqual(parseEnv("  TOKEN = a=b=c "), { TOKEN: "a=b=c" });
  });

  test("loadConfig applies defaults", () => {
    assert.deepEqual(loadConfig({ PORT: "8080" }), {
      port: 8080,
      host: "localhost",
      debug: false,
    });
  });

  test("loadConfig reads all fields", () => {
    assert.deepEqual(loadConfig({ PORT: "80", HOST: "h", DEBUG: "true" }), {
      port: 80,
      host: "h",
      debug: true,
    });
  });

  test("loadConfig fails fast on bad PORT", () => {
    assert.throws(() => loadConfig({}), /PORT is required/);
    assert.throws(() => loadConfig({ PORT: "abc" }), /PORT must be a number/);
    assert.throws(() => loadConfig({ PORT: "80.5" }), /PORT must be a number/);
  });
});
