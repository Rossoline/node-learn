# Блок 04 — Асинхронність у Node

[English](./README.md) · **Українська**

> ℹ️ Джерело істини — англійська версія ([README.md](./README.md)); український переклад може незначно відставати.

Node побудований навколо **неблокувального** I/O: замість чекати, ти плануєш роботу й
отримуєш зворотний виклик пізніше. Сьогодні це означає **promises** і `async`/`await`.

## Promises та `async`/`await`

```ts
async function loadThing(): Promise<string> {
  const value = await somethingAsync(); // розгортає проміс
  return value;
}
```

`async`-функція завжди повертає `Promise`. `await` ставить на паузу, доки проміс не
завершиться, віддаючи значення (або кидаючи виняток при відхиленні).

## Перетворення callback-API на проміс

Старі API Node використовують **error-first колбеки** — `(err, value) => ...`. Обгорни
такий у `Promise`, щоб користуватися `await`:

```ts
function readThing(cb: (err: Error | null, value?: string) => void): void { /* ... */ }

function readThingAsync(): Promise<string> {
  return new Promise((resolve, reject) => {
    readThing((err, value) => {
      if (err) reject(err);
      else resolve(value!);
    });
  });
}
```

Для стандартних error-first колбеків `promisify` із `node:util` робить це за тебе:

```ts
import { promisify } from "node:util";
const readThingAsync = promisify(readThing);
```

## Послідовно проти паралельно

```ts
// послідовно — кожен await чекає на попередній
const a = await taskA();
const b = await taskB();

// паралельно — запусти все, тоді чекай на всіх
const [x, y] = await Promise.all([taskA(), taskB()]);
const results = await Promise.all(items.map(fn)); // map + all
```

## Таймери й порядок (інтуїція)

Мікрозадачі (розвʼязані проміси) виконуються **перед** наступним таймером:

```ts
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
// друкує: "promise", тоді "timeout"
```

---

## Вправи

Відкрий [`src/exercises.ts`](./src/exercises.ts) і реалізуй кожен `// TODO`. Потім запусти:

```bash
node --import tsx --test "blocks/04-async-in-node/tests/*.test.ts"
```

1. `delay(ms)` — повернути `Promise<void>`, що розвʼязується через `ms` мілісекунд (обгорни
   `setTimeout`).
2. `parseNumber(input)` — обгорнути наданий error-first `parseNumberCb` у проміс: розвʼязати
   число або відхилити для нечислового входу.
3. `mapAsync(items, fn)` — застосувати `fn` до кожного елемента **паралельно** й повернути
   результати по порядку (`Promise.all`).

Потім порівняй з [`solutions/`](./solutions).
