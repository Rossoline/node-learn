// Block 14 — Config & Environment: worked examples
// Run me:  npm run play blocks/14-config-and-environment/src/examples.ts
export {}; // make this a module so top-level names don't clash across blocks

type Config = { port: number; host: string; debug: boolean };

function parseEnv(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (line === "" || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    out[line.slice(0, eq).trim()] = line.slice(eq + 1).trim();
  }
  return out;
}

function loadConfig(env: Record<string, string | undefined>): Config {
  if (!env.PORT) throw new Error("PORT is required");
  const port = Number(env.PORT);
  if (!Number.isInteger(port)) throw new Error("PORT must be a number");
  return { port, host: env.HOST ?? "localhost", debug: env.DEBUG === "true" };
}

const dotenv = `
# server config
PORT=8080
HOST=example.com
DEBUG=true
`;

const parsed = parseEnv(dotenv);
console.log("parsed .env:", parsed);
console.log("config:", loadConfig(parsed));

try {
  loadConfig({});
} catch (err) {
  console.log("validation error:", (err as Error).message);
}
