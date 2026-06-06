// Block 19 — Reference solutions
// Try the exercises yourself first! Read this only to check your work.

export type Semver = { major: number; minor: number; patch: number };
export type PackageInfo = { name: string; version: string };

export function parseSemver(version: string): Semver {
  const parts = version.split(".");
  if (parts.length !== 3) throw new Error("invalid version");
  const nums = parts.map((p) => Number(p));
  if (nums.some((n) => !Number.isInteger(n) || n < 0)) {
    throw new Error("invalid version");
  }
  // length === 3 is guaranteed above, so these indices are present.
  return { major: nums[0]!, minor: nums[1]!, patch: nums[2]! };
}

export function compareSemver(a: string, b: string): number {
  const va = parseSemver(a);
  const vb = parseSemver(b);
  if (va.major !== vb.major) return Math.sign(va.major - vb.major);
  if (va.minor !== vb.minor) return Math.sign(va.minor - vb.minor);
  return Math.sign(va.patch - vb.patch);
}

export function validatePackage(pkg: unknown): PackageInfo {
  if (typeof pkg !== "object" || pkg === null) {
    throw new Error("package must be an object");
  }
  const obj = pkg as Record<string, unknown>;
  if (typeof obj.name !== "string" || obj.name === "") {
    throw new Error("name is required");
  }
  if (typeof obj.version !== "string") {
    throw new Error("version is required");
  }
  parseSemver(obj.version); // throws "invalid version" if malformed
  return { name: obj.name, version: obj.version };
}

// Notes:
// - parseSemver rejects anything that isn't exactly three non-negative integers, so
//   "1.2", "1.2.x", and "-1.0.0" all throw.
// - compareSemver returns -1/0/1 via Math.sign, comparing the most significant field
//   first — the standard precedence rule.
// - validatePackage narrows `unknown` step by step (the strict-mode habit) and reuses
//   parseSemver to validate the version string.
