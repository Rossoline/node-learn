# Блок 14 — Конфіг та середовище

[English](./README.md) · **Українська**

> ℹ️ Джерело істини — англійська версія ([README.md](./README.md)); український переклад може незначно відставати.

Конфігурація береться із **середовища** (`process.env`), тож той самий код працює в dev,
CI та продакшені без правок. Навички: читати env-змінні, завантажувати файл `.env` і
**валідувати** отримане в типізований конфіг — швидко падаючи на помилках.

## `process.env`

Кожне значення — `string | undefined`. Завжди обробляй «відсутнє»:

```ts
const port = process.env.PORT ?? "3000"; // string | undefined -> string
```

## Файли `.env`

Файл `.env` — це рядки `KEY=value` (з `#`-коментарями). Node 20.6+ навіть може завантажити
один через `node --env-file=.env app.ts`. Концептуально це просто текст, який ти парсиш у
пари ключ/значення:

```
# server
PORT=8080
HOST=example.com
DEBUG=true
```

> Ніколи не комікай справжні секрети. Закоміть `.env.example`, а `.env` тримай у gitignore.

## Валідація в типізований конфіг

Перетвори вільні рядки на типізований обʼєкт, застосовуючи дефолти й відхиляючи поганий
вхід:

```ts
type Config = { port: number; host: string; debug: boolean };

function loadConfig(env: Record<string, string | undefined>): Config {
  if (!env.PORT) throw new Error("PORT is required");
  const port = Number(env.PORT);
  if (!Number.isInteger(port)) throw new Error("PORT must be a number");
  return { port, host: env.HOST ?? "localhost", debug: env.DEBUG === "true" };
}
```

Fail-fast валідація означає, що неправильно налаштований застосунок падає **на старті** з
чітким повідомленням, а не глибоко всередині запиту пізніше.

---

## Вправи

Відкрий [`src/exercises.ts`](./src/exercises.ts) і реалізуй кожен `// TODO`. Потім запусти:

```bash
node --import tsx --test "blocks/14-config-and-environment/tests/*.test.ts"
```

1. `parseEnv(text)` — розпарсити текст у стилі `.env` у `Record<string, string>`
   (пропускати порожні рядки й `#`-коментарі; розділяти за першим `=`).
2. `loadConfig(env)` — повернути типізований `Config`:
   - `PORT` — **обовʼязковий**, має бути цілим (інакше throw).
   - `HOST` — необовʼязковий, дефолт `"localhost"`.
   - `DEBUG` — `true` лише коли значення точно `"true"`.

Потім порівняй з [`solutions/`](./solutions).
