// Block 03 — Paths & Locations: worked examples
// Run me:  npm run play blocks/03-paths-and-locations/src/examples.ts
export {}; // make this a module so top-level names don't clash across blocks

import { join, resolve, basename, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

// Building and taking apart paths — portably.
console.log("join:", join("src", "app", "index.ts"));
console.log("resolve:", resolve("src", "index.ts"));
console.log("basename:", basename("/usr/local/bin/node"));
console.log("extname:", extname("archive.tar.gz"));
console.log("dirname:", dirname("/usr/local/bin/node"));

// Recreating __dirname / __filename in an ES module.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log("this file:", __filename);
console.log("this dir:", __dirname);

// A path next to this file, built portably:
console.log("sibling:", join(__dirname, "exercises.ts"));
