// Block 14 — Exercises
// Run tests:  node --import tsx --test "blocks/14-config-and-environment/tests/*.test.ts"

export type Config = { port: number; host: string; debug: boolean };

// 1. Parse .env-style text into key/value pairs.
//    - skip blank lines and lines starting with "#"
//    - split each remaining line on the FIRST "=" (values may contain "=")
//    - trim keys and values
export function parseEnv(text: string): Record<string, string> {
  void text; // remove this line once you use the parameter
  // TODO: split into lines and build the record
  throw new Error("Not implemented");
}

// 2. Build a typed Config from an env record.
//    - PORT: required integer (throw "PORT is required" / "PORT must be a number")
//    - HOST: optional, default "localhost"
//    - DEBUG: true only when the value is exactly "true"
export function loadConfig(env: Record<string, string | undefined>): Config {
  void env; // remove this line once you use the parameter
  // TODO: validate PORT, apply defaults, return the Config
  throw new Error("Not implemented");
}
