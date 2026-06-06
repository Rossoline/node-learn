// Block 19 — Packaging & Scripts: worked examples
// Run me:  npm run play blocks/19-packaging-and-scripts/src/examples.ts
export {}; // make this a module so top-level names don't clash across blocks

type Semver = { major: number; minor: number; patch: number };

function parseSemver(version: string): Semver {
  const parts = version.split(".");
  if (parts.length !== 3) throw new Error("invalid version");
  const nums = parts.map((p) => Number(p));
  if (nums.some((n) => !Number.isInteger(n) || n < 0)) throw new Error("invalid version");
  return { major: nums[0]!, minor: nums[1]!, patch: nums[2]! };
}

function compareSemver(a: string, b: string): number {
  const va = parseSemver(a);
  const vb = parseSemver(b);
  if (va.major !== vb.major) return Math.sign(va.major - vb.major);
  if (va.minor !== vb.minor) return Math.sign(va.minor - vb.minor);
  return Math.sign(va.patch - vb.patch);
}

console.log("parse 1.4.2:", parseSemver("1.4.2"));
console.log("compare 1.0.0 vs 1.2.0:", compareSemver("1.0.0", "1.2.0")); // -1
console.log("compare 2.0.0 vs 1.9.9:", compareSemver("2.0.0", "1.9.9")); // 1

try {
  parseSemver("1.2");
} catch (err) {
  console.log("rejected '1.2':", (err as Error).message);
}
