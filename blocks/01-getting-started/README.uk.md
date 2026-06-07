# Блок 01 — Перші кроки

[English](./README.md) · **Українська**

> ℹ️ Джерело істини — англійська версія ([README.md](./README.md)); український переклад може незначно відставати.

## Що таке Node.js?

Node.js запускає JavaScript **поза браузером** — на твоїй машині чи сервері. Замість
`window` і DOM ти отримуєш API для **файлової системи, мережі, процесів і потоків**. Ми
пишемо все на **TypeScript** і запускаємо через `tsx` (без кроку збірки):

```bash
npm run play blocks/01-getting-started/src/examples.ts
```

## Твій перший тест (`node:test`)

Node постачає **вбудований тест-раннер** — нічого встановлювати. Тести використовують
`node:test` і `node:assert/strict`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { greet } from "../src/exercises.ts";

test("greet says hello", () => {
  assert.equal(greet("Ada"), "Hello from Node, Ada!");
});
```

Запусти тести цього блоку:

```bash
node --import tsx --test "blocks/01-getting-started/tests/*.test.ts"
# або просто: npm test   (запускає кожен блок)
```

> `assert.equal(actual, expected)` із `node:assert/strict` використовує строге (`===`)
> порівняння. Для обʼєктів/масивів використовуй `assert.deepEqual`.

## `process`: аргументи та середовище

Програма Node може читати аргументи командного рядка й змінні середовища через глобальний
`process`:

```ts
process.argv;  // ["node", "/path/script.ts", ...твої аргументи]
process.env;   // { PATH: "...", HOME: "...", ... }
```

`process.argv` завжди починається з бінарника Node і шляху до скрипта; **справжні**
аргументи йдуть після перших двох:

```ts
const args = process.argv.slice(2);
```

Змінні середовища — це **рядки або `undefined`**: немає гарантії, що ключ існує, тож завжди
давай fallback:

```ts
const port = process.env.PORT ?? "3000"; // process.env.PORT — це string | undefined
```

> За `strict`-налаштувань цього репо (`noUncheckedIndexedAccess`) `process.env.WHATEVER`
> навмисно типізовано як `string | undefined` — обробляй випадок відсутності.

---

## Вправи

Відкрий [`src/exercises.ts`](./src/exercises.ts) і реалізуй кожен `// TODO`. Потім запусти:

```bash
node --import tsx --test "blocks/01-getting-started/tests/*.test.ts"
```

1. `greet(name)` — повернути `"Hello from Node, <name>!"`.
2. `parseArgs(argv)` — за масивом у стилі `process.argv` повернути лише користувацькі
   аргументи (усе після перших двох елементів).
3. `getEnvOrDefault(key, fallback)` — повернути `process.env[key]`, якщо задано, інакше
   `fallback`.

Коли тести зелені, порівняй з [`solutions/`](./solutions).
