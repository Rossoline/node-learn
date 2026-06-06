// Block 17 — CLI Tools: worked examples
// Run me:  npm run play blocks/17-cli-tools/src/examples.ts -- --name Ada --count 2 --verbose
export {}; // make this a module so top-level names don't clash across blocks

import { parseArgs } from "node:util";

const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    name: { type: "string", default: "world" },
    verbose: { type: "boolean", default: false },
    count: { type: "string", default: "1" },
  },
  allowPositionals: true,
});

const name = values.name ?? "world";
const count = Number(values.count ?? "1");

for (let i = 0; i < count; i++) {
  console.log(`Hello, ${name}!`);
}
if (values.verbose) {
  console.error(`(verbose) printed ${count} line(s); positionals:`, positionals);
}

// Try piping input:  echo "data" | npm run play blocks/17-cli-tools/src/examples.ts
