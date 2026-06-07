# Блок 05 — Помилки та процес

[English](./README.md) · **Українська**

> ℹ️ Джерело істини — англійська версія ([README.md](./README.md)); український переклад може незначно відставати.

Як програми Node гарно падають: типізована обробка помилок, власні класи помилок і вихід
із правильним **кодом виходу** (exit code), щоб інші інструменти могли зреагувати.

## Спіймані помилки мають тип `unknown`

За `strict` змінна в `catch` має тип `unknown` — кинути можна будь-що. Звузь перед
використанням:

```ts
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "unknown error";
}
```

## Власні класи помилок

Успадкуйся від `Error`, щоб додати контекст (тут — код виходу, який має використати CLI):

```ts
class AppError extends Error {
  constructor(
    message: string,
    public readonly exitCode: number,
  ) {
    super(message);
    this.name = "AppError";
  }
}
```

## Повертати збій замість кидати виняток

`Result` робить збій частиною значення, тож виклик мусить його обробити:

```ts
type Result<T> = { ok: true; value: T } | { ok: false; error: Error };
```

## Процес і коди виходу

Процес Node завершується **кодом виходу**: `0` означає успіх, будь-що інше — невдачу.
Надавай перевагу встановленню `process.exitCode` і завершенню програми природно над
`process.exit()`, який убиває її негайно (можливо, обриваючи незавершений I/O):

```ts
process.exitCode = 1;        // краще: мʼяко
// process.exit(1);          // різко — лише коли справді треба спинитися негайно
```

Як страхувальну сітку можна спостерігати падіння глобально (вживай зрідка — лікуй причину):

```ts
process.on("uncaughtException", (err) => {
  console.error("fatal:", err);
  process.exit(1);
});
```

---

## Вправи

Відкрий [`src/exercises.ts`](./src/exercises.ts) і реалізуй кожен `// TODO`. Потім запусти:

```bash
node --import tsx --test "blocks/05-errors-and-the-process/tests/*.test.ts"
```

1. `tryCatch(fn)` — виконати синхронну функцію й повернути `Result<T>`: `{ ok: true, value }`
   при успіху, `{ ok: false, error }` (нормалізоване до `Error`) при викинутому винятку.
2. `exitCodeFor(error)` — повернути `exitCode` із `AppError` або `1` для будь-якої іншої
   помилки.
3. `getErrorMessage(error)` — звузити `unknown`-помилку до читабельного повідомлення.

Потім порівняй з [`solutions/`](./solutions).
