# Блок 06 — Читання файлів

[English](./README.md) · **Українська**

> ℹ️ Джерело істини — англійська версія ([README.md](./README.md)); український переклад може незначно відставати.

Node читає файли через `node:fs`. Використовуй **проміс-орієнтований** API
(`node:fs/promises`), щоб `await`-ити замість вкладених колбеків.

## Читання тексту

```ts
import { readFile } from "node:fs/promises";

const text = await readFile("notes.txt", "utf8"); // string
```

Передай **кодування** (`"utf8"`), щоб отримати `string`. Без нього отримаєш `Buffer`
(сирі байти — блок 10).

## Читання JSON

JSON — це просто текст, який ти парсиш:

```ts
const raw = await readFile("config.json", "utf8");
const config = JSON.parse(raw) as { name: string };
```

## Перелік теки

```ts
import { readdir } from "node:fs/promises";

const names = await readdir("."); // string[] імен записів (не повні шляхи)
```

`readdir` повертає лише **імена** записів; зʼєднай їх із текою, щоб отримати повні шляхи
(блок 03).

## Перевірка шляху через `stat`

```ts
import { stat } from "node:fs/promises";

const info = await stat("notes.txt");
info.isFile();      // true
info.isDirectory(); // false
info.size;          // байти
```

Відсутній файл змушує їх відхилитися з помилкою `ENOENT` — обгортай у `try/catch`, коли
файл може не існувати.

---

## Вправи

Відкрий [`src/exercises.ts`](./src/exercises.ts) і реалізуй кожен `// TODO` через
`node:fs/promises`. Потім запусти:

```bash
node --import tsx --test "blocks/06-reading-files/tests/*.test.ts"
```

1. `readText(path)` — прочитати UTF-8 текстовий файл і повернути його вміст.
2. `listFiles(dir)` — повернути імена записів теки, **відсортовані** за абеткою.
3. `readJson(path)` — прочитати файл і `JSON.parse`-нути його (узагальнений тип повернення).

(Тести читають із теки `fixtures/` цього блоку.) Потім порівняй з [`solutions/`](./solutions).
