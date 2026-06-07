# Блок 07 — Запис файлів

[English](./README.md) · **Українська**

> ℹ️ Джерело істини — англійська версія ([README.md](./README.md)); український переклад може незначно відставати.

Запис віддзеркалює читання: той самий модуль `node:fs/promises`, лише в інший бік.

## Запис і дозапис

```ts
import { writeFile, appendFile } from "node:fs/promises";

await writeFile("out.txt", "hello\n");        // створити або ПЕРЕЗАПИСАТИ
await appendFile("log.txt", "a line\n");      // додати в кінець (створює, якщо немає)
```

Запиши JSON, спершу серіалізувавши його:

```ts
await writeFile("config.json", JSON.stringify(data, null, 2)); // з відступами
```

## Створення й видалення тек

```ts
import { mkdir, rm } from "node:fs/promises";

await mkdir("a/b/c", { recursive: true }); // створити весь ланцюжок, без помилки якщо існує
await rm("a", { recursive: true, force: true }); // видалити дерево, ігнорувати «відсутнє»
```

`{ recursive: true }` — звичний вибір; `force: true` для `rm` означає «не помилятися, якщо
вже зникло».

## Майже-атомарні записи: temp, тоді rename

Якщо програма падає **посеред запису**, файл може лишитися напівзаписаним. Запис у
тимчасовий файл і подальший **rename** цього уникає — перейменування в межах однієї
файлової системи атомарне, тож читачі бачать або старий файл, або повний новий, ніколи —
частковий:

```ts
import { writeFile, rename } from "node:fs/promises";

await writeFile("data.json.tmp", contents);
await rename("data.json.tmp", "data.json");
```

---

## Вправи

Відкрий [`src/exercises.ts`](./src/exercises.ts) і реалізуй кожен `// TODO` через
`node:fs/promises`. Потім запусти:

```bash
node --import tsx --test "blocks/07-writing-files/tests/*.test.ts"
```

1. `writeJson(path, data)` — записати `data` як JSON **із відступами** (2 пробіли).
2. `appendLine(path, line)` — дозаписати `line`, а за ним символ нового рядка (`\n`).
3. `writeAtomic(path, contents)` — записати в `path + ".tmp"`, тоді `rename`-нути в `path`.

(Тести використовують одноразову тимчасову теку й прибирають її.) Потім порівняй з
[`solutions/`](./solutions).
