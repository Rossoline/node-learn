// Block 01 — Getting Started: worked examples
// Run me:  npm run play blocks/01-getting-started/src/examples.ts
export {}; // make this a module so top-level names don't clash across blocks

// 1. A plain typed function — Node runs the same JS/TS you already know.
function greet(name: string): string {
  return `Hello from Node, ${name}!`;
}
console.log(greet("Ada"));

// 2. process.argv — the command line. First two entries are node + this script.
console.log("argv:", process.argv);
const userArgs = process.argv.slice(2);
console.log("your args:", userArgs);

// 3. process.env — environment variables are string | undefined.
const shell = process.env.SHELL ?? process.env.ComSpec ?? "(unknown shell)";
console.log("shell:", shell);

// 4. The runtime tells you about itself.
console.log("node version:", process.version);
console.log("platform:", process.platform);

// Try running with extra args:
//   npm run play blocks/01-getting-started/src/examples.ts -- hello world
