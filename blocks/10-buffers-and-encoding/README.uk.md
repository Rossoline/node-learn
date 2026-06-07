# Блок 10 — Buffer та кодування

[English](./README.md) · **Українська**

> ℹ️ Джерело істини — англійська версія ([README.md](./README.md)); український переклад може незначно відставати.

**`Buffer`** — це контейнер Node для **сирих байтів** — даних за файлами, сокетами й
криптографією. Текст — це просто байти в певному **кодуванні** (зазвичай UTF-8).

## Рядки ⇄ байти

```ts
const bytes = Buffer.from("hello", "utf8"); // string -> Buffer
const text = bytes.toString("utf8");        // Buffer -> string
```

Кодування важливе в обидва боки: `"utf8"`, `"hex"`, `"base64"`, `"ascii"`, …

```ts
Buffer.from("hello", "utf8").toString("base64"); // "aGVsbG8="
Buffer.from("aGVsbG8=", "base64").toString("utf8"); // "hello"
Buffer.from("hello", "utf8").toString("hex"); // "68656c6c6f"
```

## Довжина в байтах ≠ довжина рядка

Символ може займати більше одного байта в UTF-8:

```ts
"é".length;                       // 1 (один символ)
Buffer.byteLength("é", "utf8");   // 2 (два байти)
```

Використовуй `Buffer.byteLength`, коли потрібен справжній розмір (напр. заголовок
`Content-Length`).

## Зʼєднання буферів

```ts
Buffer.concat([Buffer.from("foo"), Buffer.from("bar")]).toString(); // "foobar"
```

> Веб-стандартні `TextEncoder`/`TextDecoder` теж працюють у Node і виробляють/споживають
> `Uint8Array` — зручно для кросплатформного коду.

---

## Вправи

Відкрий [`src/exercises.ts`](./src/exercises.ts) і реалізуй кожен `// TODO`. Потім запусти:

```bash
node --import tsx --test "blocks/10-buffers-and-encoding/tests/*.test.ts"
```

1. `toBase64(text)` — закодувати UTF-8 рядок у base64.
2. `fromBase64(b64)` — декодувати base64 назад у UTF-8 рядок.
3. `byteLength(text)` — кількість **байтів**, яку займає UTF-8 рядок.

Потім порівняй з [`solutions/`](./solutions).
