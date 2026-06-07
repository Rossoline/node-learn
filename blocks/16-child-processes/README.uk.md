# Блок 16 — Дочірні процеси

[English](./README.md) · **Українська**

> ℹ️ Джерело істини — англійська версія ([README.md](./README.md)); український переклад може незначно відставати.

Node може запускати **інші програми** — git, ffmpeg, інший скрипт — через
`node:child_process`. Є два стилі, якими ти користуватимешся найчастіше.

## `execFile` — запустити, тоді отримати буферизований вивід

Добре для коротких команд, чий вивід вміщається в памʼять. Промісифікуй, щоб `await`-ити:

```ts
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const { stdout, stderr } = await run("node", ["--version"]);
```

`execFile` **відхиляється**, якщо програма завершується ненульовим кодом (помилка несе
`code`, `stdout`, `stderr`). Надавай перевагу `execFile` над `exec`: `execFile` передає
аргументи масивом (без оболонки), уникаючи проблем із лапками й інʼєкціями.

## `spawn` — стрімити вивід, обробляти вихід самому

Добре для довготривалих процесів чи великого виводу. Ти підключаєш потоки й подію `close`:

```ts
import { spawn } from "node:child_process";

const child = spawn("node", ["-e", "console.log('hi')"]);
child.stdout.on("data", (chunk) => { /* ... */ });
child.on("close", (code) => { /* код виходу (number | null) */ });
```

## Коди виходу

Дочірній процес повідомляє про успіх/невдачу через свій **код виходу** (`0` = ок).
`execFile` перетворює ненульовий код на відхилення; зі `spawn` ти читаєш його з події
`close`.

> Щоб лишатися кросплатформним, ці вправи запускають **сам `node`** (`process.execPath`)
> замість OS-специфічних команд.

---

## Вправи

Відкрий [`src/exercises.ts`](./src/exercises.ts) і реалізуй кожен `// TODO` через
`node:child_process`. Потім запусти:

```bash
node --import tsx --test "blocks/16-child-processes/tests/*.test.ts"
```

1. `evalNode(code)` — запустити `node -e <code>` через `execFile` і повернути обрізаний
   `stdout`.
2. `runNode(args)` — `spawn`-нути `node` з `args`, зібрати `stdout` і розвʼязати з
   `{ stdout, exitCode }` (обробляючи ненульові виходи без відхилення).

Потім порівняй з [`solutions/`](./solutions).
