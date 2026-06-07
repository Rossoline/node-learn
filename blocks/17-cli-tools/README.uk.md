# Блок 17 — CLI-інструменти

[English](./README.md) · **Українська**

> ℹ️ Джерело істини — англійська версія ([README.md](./README.md)); український переклад може незначно відставати.

Інструмент командного рядка читає **аргументи** та **stdin**, пише **stdout** і сигналізує
про успіх **кодом виходу**. У Node усе є вбудованим.

## Парсинг аргументів через `parseArgs`

Ручний парсинг `process.argv` стає неохайним. `parseArgs` із `node:util` обробляє прапорці,
значення й дефолти:

```ts
import { parseArgs } from "node:util";

const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    name: { type: "string", default: "world" },
    verbose: { type: "boolean", default: false },
    count: { type: "string", default: "1" }, // числа надходять як рядки
  },
});
// node app.ts --name Ada --verbose --count 3
// values.name = "Ada", values.verbose = true, values.count = "3"
```

`parseArgs` дає лише `string`/`boolean`; числа конвертуй сам через `Number(...)`.

## Читання stdin

`process.stdin` — це потік Readable; збирай його як будь-який інший (блок 08), щоб твій
інструмент працював у pipe (`cat file | node app.ts`):

```ts
let input = "";
for await (const chunk of process.stdin) input += chunk;
```

## Запис виводу та коди виходу

`console.log` пише рядок у stdout; `console.error` пише в stderr. Встанови
`process.exitCode`, щоб сигналізувати про невдачу (`0` ок, ненульове = помилка) — див.
блок 05.

---

## Вправи

Відкрий [`src/exercises.ts`](./src/exercises.ts) і реалізуй кожен `// TODO`. Потім запусти:

```bash
node --import tsx --test "blocks/17-cli-tools/tests/*.test.ts"
```

1. `parseFlags(args)` — через `parseArgs` повернути `{ name, verbose, count }` із дефолтами
   `"world"` / `false` / `1` (конвертуй `count` у число).
2. `readInput(stream)` — зібрати Readable (як stdin) у рядок.
3. `repeatGreeting(name, count)` — повернути `count` рядків `"Hello, <name>!"`, зʼєднаних
   новими рядками.

Потім порівняй з [`solutions/`](./solutions).
