// Block 19 — Exercises
// Run tests:  node --import tsx --test "blocks/19-packaging-and-scripts/tests/*.test.ts"

export type Semver = { major: number; minor: number; patch: number };
export type PackageInfo = { name: string; version: string };

// 1. Parse "MAJOR.MINOR.PATCH" into numbers. Throw Error("invalid version") if it isn't
//    exactly three non-negative integers.
export function parseSemver(version: string): Semver {
  void version; // remove this line once you use the parameter
  // TODO: split on ".", validate 3 non-negative integer parts
  throw new Error("Not implemented");
}

// 2. Compare two versions: return -1 if a < b, 1 if a > b, 0 if equal.
//    (Compare major, then minor, then patch.)
export function compareSemver(a: string, b: string): number {
  void a;
  void b; // remove these lines once you use the parameters
  // TODO: parseSemver both, compare field by field
  throw new Error("Not implemented");
}

// 3. Validate an unknown value as a package manifest: require a non-empty string `name`
//    and a valid semver `version`. Return { name, version } or throw.
export function validatePackage(pkg: unknown): PackageInfo {
  void pkg; // remove this line once you use the parameter
  // TODO: narrow to an object, check name + version (use parseSemver to validate)
  throw new Error("Not implemented");
}
