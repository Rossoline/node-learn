# Блок 09 — Події

[English](./README.md) · **Українська**

> ℹ️ Джерело істини — англійська версія ([README.md](./README.md)); український переклад може незначно відставати.

Значна частина Node **керована подіями**: сервери, потоки й процеси випромінюють події, на
які ти підписуєшся. Патерн — `EventEmitter`.

## `on` / `once` / `emit`

```ts
import { EventEmitter } from "node:events";

const bus = new EventEmitter();

bus.on("message", (text: string) => console.log("got:", text)); // щоразу
bus.once("ready", () => console.log("ready once"));             // лише перший раз
bus.emit("message", "hello"); // тригерить слухачів синхронно
```

`emit(event, ...args)` викликає кожного слухача для `event`, по порядку, **синхронно**.

## Особлива подія `error`

Якщо `EventEmitter` випромінює `"error"` і **жоден слухач** не підключений, Node кидає
виняток і може завалити процес. Завжди обробляй її на емітерах, що можуть зазнати збою:

```ts
bus.on("error", (err) => console.error("handled:", err));
```

## Очікування події

`events.once` перетворює наступну подію на проміс — чудово для «чекати, поки готово»:

```ts
import { once } from "node:events";

const [value] = await once(bus, "data"); // розвʼязується з випроміненими аргументами
```

## Типізація подій

Сирий `EventEmitter` нетипізований (`emit`/`on` приймають `any`). Для безпеки обгорни його
так, щоб кожне імʼя події мапилось на відомі типи аргументів:

```ts
type Events = { message: [text: string]; count: [n: number] };
```

---

## Вправи

Відкрий [`src/exercises.ts`](./src/exercises.ts) і реалізуй кожен `// TODO` через
`node:events`. Потім запусти:

```bash
node --import tsx --test "blocks/09-events/tests/*.test.ts"
```

1. `onceValue(emitter, event)` — розвʼязати першим payload, випроміненим для `event`
   (використай `once`).
2. `collectEvents(emitter, event)` — підписатися й повернути getter для кожного отриманого
   досі payload.
3. `TypedBus` — невелика обгортка, чиї `on`/`emit` **типізовані** мапою подій.

Потім порівняй з [`solutions/`](./solutions).
