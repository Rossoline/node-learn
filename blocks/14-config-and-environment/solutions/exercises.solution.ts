// Block 14 — Reference solutions
// Try the exercises yourself first! Read this only to check your work.

export type Config = { port: number; host: string; debug: boolean };

export function parseEnv(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (line === "" || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    const value = line.slice(eq + 1).trim();
    out[key] = value;
  }
  return out;
}

export function loadConfig(env: Record<string, string | undefined>): Config {
  if (!env.PORT) throw new Error("PORT is required");
  const port = Number(env.PORT);
  if (!Number.isInteger(port)) throw new Error("PORT must be a number");
  return {
    port,
    host: env.HOST ?? "localhost",
    debug: env.DEBUG === "true",
  };
}

// Notes:
// - Splitting on the FIRST "=" (indexOf) keeps "=" that appear inside values intact.
// - loadConfig fails fast: a missing/!integer PORT throws at startup with a clear message
//   rather than surfacing as a confusing bug later.
// - DEBUG uses an exact "true" check, so "1"/"yes"/"" are all treated as false.
//   (A real loader might also strip surrounding quotes from .env values.)
