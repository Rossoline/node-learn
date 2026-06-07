# Блок 02 — Модулі та npm

[English](./README.md) · **Українська**

> ℹ️ Джерело істини — англійська версія ([README.md](./README.md)); український переклад може незначно відставати.

## ES-модулі проти CommonJS

У Node дві системи модулів:

- **ES-модулі (ESM)** — `import` / `export`. Сучасний стандарт; це репо використовує його
  (`"type": "module"` у `package.json`).
- **CommonJS (CJS)** — `require()` / `module.exports`. Початкова система Node, досі всюди в
  старому коді.

```ts
// ESM (те, що ми використовуємо)
import { readFile } from "node:fs/promises";
export function load() {}

// CommonJS (старіший стиль)
const { readFile } = require("node:fs/promises");
module.exports = { load };
```

## Іменовані проти стандартних експортів

```ts
// іменовані експорти — кращі (явні, зручні для рефакторингу)
export function add(a: number, b: number): number {
  return a + b;
}

// один стандартний експорт (default)
export default function main() {}
```

```ts
import main, { add } from "./calc.ts"; // default + named разом
```

## Специфікатор `node:`

Вбудовані модулі варто імпортувати з префіксом **`node:`**. Він однозначний (жоден
npm-пакет його не перекриє) і самоописовий:

```ts
import { randomUUID } from "node:crypto";
import { cpus, homedir } from "node:os";
import { join } from "node:path";
```

## `package.json` та npm

`package.json` описує твій проєкт: його `name`, `"type": "module"`, `scripts` і
`dependencies`. Поширені команди:

```bash
npm install            # встановити все з package.json
npm install <pkg>      # додати runtime-залежність
npm install -D <pkg>   # додати dev-залежність (напр. typescript, tsx)
npm run <script>       # запустити скрипт із package.json
```

> Вбудовані модулі (`node:*`) **не потребують встановлення** — вони постачаються з Node. Ти
> `npm install`-иш лише сторонні пакети.

---

## Вправи

Відкрий [`src/exercises.ts`](./src/exercises.ts) і реалізуй кожен `// TODO`, імпортуючи
відповідні **вбудовані `node:`-модулі**. Потім запусти:

```bash
node --import tsx --test "blocks/02-modules-and-npm/tests/*.test.ts"
```

1. `uuid()` — повернути випадковий UUID через `randomUUID` із `node:crypto`.
2. `cpuCount()` — повернути кількість ядер CPU цієї машини (`node:os` `cpus`).
3. `homeDir()` — повернути домашню теку поточного користувача (`node:os` `homedir`).

Потім порівняй з [`solutions/`](./solutions).
