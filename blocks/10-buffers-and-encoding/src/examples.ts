// Block 10 — Buffers & Encoding: worked examples
// Run me:  npm run play blocks/10-buffers-and-encoding/src/examples.ts
export {}; // make this a module so top-level names don't clash across blocks

// String <-> bytes under different encodings.
const bytes = Buffer.from("hello", "utf8");
console.log("base64:", bytes.toString("base64"));
console.log("hex:", bytes.toString("hex"));
console.log("back to text:", Buffer.from("aGVsbG8=", "base64").toString("utf8"));

// Byte length vs string length.
console.log("'é'.length:", "é".length); // 1
console.log("byteLength('é'):", Buffer.byteLength("é", "utf8")); // 2

// Concatenate buffers.
const joined = Buffer.concat([Buffer.from("foo"), Buffer.from("bar")]);
console.log("concat:", joined.toString());

// The Web-standard TextEncoder also works in Node.
console.log("TextEncoder bytes:", new TextEncoder().encode("hi")); // Uint8Array(2)
