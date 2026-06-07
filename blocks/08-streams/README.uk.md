# Блок 08 — Потоки (Streams)

[English](./README.md) · **Українська**

> ℹ️ Джерело істини — англійська версія ([README.md](./README.md)); український переклад може незначно відставати.

Потоки обробляють дані **порціями (chunks)** замість завантаження всього в памʼять — це
ключове для великих файлів, мережевих сокетів і всього, що можна почати обробляти ще до
повного надходження.

## Види потоків

- **Readable** — ти читаєш порції (читання файлу, тіло HTTP-запиту).
- **Writable** — ти пишеш порції (запис файлу, HTTP-відповідь).
- **Transform** — і читання, *і* запис: дані входять, трансформовані дані виходять.

## Читання потоку

Readable — асинхронно-ітерабельний, тож можна `for await` по його порціях:

```ts
import { Readable } from "node:stream";

async function collect(source: Readable): Promise<string> {
  let out = "";
  for await (const chunk of source) out += chunk.toString();
  return out;
}

await collect(Readable.from(["Hello, ", "streams!"])); // "Hello, streams!"
```

## Pipe та `pipeline`

`pipe` зʼєднує Readable із Writable. Надавай перевагу `pipeline` (із `node:stream/promises`)
— він обробляє помилки й прибирання, і його можна `await`-ити:

```ts
import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream } from "node:fs";

await pipeline(createReadStream("in.txt"), createWriteStream("out.txt"));
```

## Transform та backpressure

`Transform` переписує порції, поки вони проходять:

```ts
import { Transform } from "node:stream";

const upper = new Transform({
  transform(chunk, _enc, cb) {
    cb(null, chunk.toString().toUpperCase());
  },
});
```

**Backpressure** (зворотний тиск) автоматичний із `pipe`/`pipeline`: якщо призначення
повільне, джерело ставиться на паузу. У цьому й суть потоків — обмежене використання
памʼяті.

---

## Вправи

Відкрий [`src/exercises.ts`](./src/exercises.ts) і реалізуй кожен `// TODO` через
`node:stream`. Потім запусти:

```bash
node --import tsx --test "blocks/08-streams/tests/*.test.ts"
```

1. `collect(source)` — прочитати кожну порцію Readable у єдиний рядок.
2. `countBytes(source)` — підсумувати довжину в байтах усього, що проходить крізь Readable.
3. `upperCase()` — повернути `Transform`, що переводить у верхній регістр текст, який крізь
   нього проходить.

Потім порівняй з [`solutions/`](./solutions).
