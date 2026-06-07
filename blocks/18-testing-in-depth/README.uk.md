# Блок 18 — Тестування глибше

[English](./README.md) · **Українська**

> ℹ️ Джерело істини — англійська версія ([README.md](./README.md)); український переклад може незначно відставати.

Ти користуєшся `node:test` із блоку 01. Ось можливості, що роблять його справжнім
тест-фреймворком — і як писати код, який **легко тестувати**.

## Структура та життєвий цикл

```ts
import { describe, it, before, after, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

describe("a feature", () => {
  beforeEach(() => {/* свіжий стан на кожен тест */});
  it("does a thing", () => assert.equal(1 + 1, 2));
});
```

## Асинхронні тести

Зроби колбек `async` і `await`-ай; перевіряй відхилення явно:

```ts
it("loads data", async () => {
  assert.equal(await load(), 42);
});
it("rejects bad input", async () => {
  await assert.rejects(load(-1), /invalid/);
});
```

## Перевірка кинутих помилок

```ts
assert.throws(() => parsePositive("-1"), /not a positive number/);
```

## Моки та spies

`mock.fn` із `node:test` створює **spy** — фейкову функцію, що записує, як її викликали.
Саме тому важливе **впровадження залежностей** (dependency injection): передаєш колаборатори
ззовні, і тест може підставити мок:

```ts
import { mock } from "node:test";

const getName = mock.fn((id: number) => "Ada");
greetUser(1, getName);

getName.mock.callCount();             // 1
getName.mock.calls[0].arguments;      // [1]
```

> Запусти з покриттям будь-коли: `node --import tsx --test --experimental-test-coverage ...`

---

## Вправи

Відкрий [`src/exercises.ts`](./src/exercises.ts) і реалізуй кожен `// TODO`. Функції
приймають свої колаборатори як **параметри**, щоб тести могли їх замокати. Потім запусти:

```bash
node --import tsx --test "blocks/18-testing-in-depth/tests/*.test.ts"
```

1. `greetUser(id, getName)` — повернути `"Hello, <name>!"` через впроваджений `getName`.
2. `parsePositive(input)` — повернути додатне число або **кинути**
   `"not a positive number"`.
3. `sumTwice(load)` — `await`-ити async `load` двічі й повернути суму.

Потім порівняй з [`solutions/`](./solutions) і прочитай, як тести їх мокають.
