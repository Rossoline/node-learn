# Block 19 — Packaging & Scripts

**English** · [Українська](./README.uk.md)

`package.json` is the manifest that turns a folder of code into an installable, runnable
package.

## Scripts

```jsonc
{
  "scripts": {
    "start": "node --import tsx src/main.ts",
    "test": "node --import tsx --test \"**/*.test.ts\"",
    "build": "tsc"
  }
}
```

Run them with `npm run <name>` (`npm test`/`npm start` are shortcuts).

## `bin` — shipping a CLI

The `bin` field maps a command name to a script, so `npm install -g` (or `npx`) exposes
it on the PATH:

```jsonc
{ "bin": { "greet": "dist/cli.js" } }
```

## `exports` — your public API

`exports` declares what consumers may import (and hides internals):

```jsonc
{ "exports": { ".": "./dist/index.js" } }
```

## Versioning with semver

Versions are `MAJOR.MINOR.PATCH`:

- **MAJOR** — breaking changes
- **MINOR** — new, backwards-compatible features
- **PATCH** — backwards-compatible fixes

Dependency ranges: `^1.2.3` allows `<2.0.0` (minor/patch updates), `~1.2.3` allows
`<1.3.0` (patch only), `1.2.3` is exact.

> Publishing (FYI): `npm version patch` bumps the version + tags it, then `npm publish`
> uploads it. `npm pack` previews the tarball without publishing.

---

## Exercises

Open [`src/exercises.ts`](./src/exercises.ts) and implement each `// TODO`. Then run:

```bash
node --import tsx --test "blocks/19-packaging-and-scripts/tests/*.test.ts"
```

1. `parseSemver(version)` — parse `"MAJOR.MINOR.PATCH"` into numbers; **throw**
   `"invalid version"` for anything malformed.
2. `compareSemver(a, b)` — return `-1`, `0`, or `1` comparing two versions.
3. `validatePackage(pkg)` — narrow `unknown` to `{ name, version }`, requiring a
   non-empty `name` and a valid semver `version` (else throw).

Then compare with [`solutions/`](./solutions).
