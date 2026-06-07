# Блок 19 — Пакування та скрипти

[English](./README.md) · **Українська**

> ℹ️ Джерело істини — англійська версія ([README.md](./README.md)); український переклад може незначно відставати.

`package.json` — це маніфест, що перетворює теку з кодом на встановлюваний, запускний пакет.

## Скрипти

```jsonc
{
  "scripts": {
    "start": "node --import tsx src/main.ts",
    "test": "node --import tsx --test \"**/*.test.ts\"",
    "build": "tsc"
  }
}
```

Запускай їх через `npm run <name>` (`npm test`/`npm start` — скорочення).

## `bin` — постачання CLI

Поле `bin` мапить імʼя команди на скрипт, тож `npm install -g` (або `npx`) виставляє його в
PATH:

```jsonc
{ "bin": { "greet": "dist/cli.js" } }
```

## `exports` — твій публічний API

`exports` оголошує, що споживачі можуть імпортувати (і ховає внутрішнє):

```jsonc
{ "exports": { ".": "./dist/index.js" } }
```

## Версіонування за semver

Версії — це `MAJOR.MINOR.PATCH`:

- **MAJOR** — несумісні зміни (breaking)
- **MINOR** — нові, зворотно сумісні фічі
- **PATCH** — зворотно сумісні виправлення

Діапазони залежностей: `^1.2.3` дозволяє `<2.0.0` (minor/patch оновлення), `~1.2.3` дозволяє
`<1.3.0` (лише patch), `1.2.3` — точна.

> Публікація (до відома): `npm version patch` піднімає версію + тегує, тоді `npm publish`
> завантажує. `npm pack` показує tarball без публікації.

---

## Вправи

Відкрий [`src/exercises.ts`](./src/exercises.ts) і реалізуй кожен `// TODO`. Потім запусти:

```bash
node --import tsx --test "blocks/19-packaging-and-scripts/tests/*.test.ts"
```

1. `parseSemver(version)` — розпарсити `"MAJOR.MINOR.PATCH"` у числа; **кинути**
   `"invalid version"` для будь-чого некоректного.
2. `compareSemver(a, b)` — повернути `-1`, `0` або `1`, порівнюючи дві версії.
3. `validatePackage(pkg)` — звузити `unknown` до `{ name, version }`, вимагаючи непорожнє
   `name` і валідну semver-`version` (інакше throw).

Потім порівняй з [`solutions/`](./solutions).
