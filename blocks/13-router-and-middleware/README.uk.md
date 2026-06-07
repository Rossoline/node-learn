# Блок 13 — Крихітний роутер та middleware

[English](./README.md) · **Українська**

> ℹ️ Джерело істини — англійська версія ([README.md](./README.md)); український переклад може незначно відставати.

Фреймворки на кшталт Express — це по суті **роутер** (зіставляє метод + шлях → обробник)
плюс **middleware** (функції, що обгортають обробники). Збудуймо крихітну версію.

## Роутер

Зберігай обробники за ключем `"METHOD /path"`, тоді шукай один на запит:

```ts
type Handler = (req: IncomingMessage, res: ServerResponse) => void | Promise<void>;

class Router {
  private routes = new Map<string, Handler>();
  get(path: string, h: Handler) {
    this.routes.set(`GET ${path}`, h);
  }
  async handle(req: IncomingMessage, res: ServerResponse) {
    const { pathname } = new URL(req.url ?? "", "http://localhost");
    const handler = this.routes.get(`${req.method} ${pathname}`);
    if (!handler) {
      /* 404 */ return;
    }
    await handler(req, res);
  }
}
```

## Middleware

Middleware — це функція, що приймає обробник і повертає **новий** обробник: робить щось
до/після (логування, авторизація, таймінг) і делегує оригіналу:

```ts
function withLogging(handler: Handler, log: (line: string) => void): Handler {
  return async (req, res) => {
    log(`${req.method} ${req.url}`);
    await handler(req, res);
  };
}
```

Обгортки композуються: `withAuth(withLogging(handler, log))`.

## Межа помилок (500)

Якщо обробник кидає виняток, щось має перетворити це на `500` замість завислого запиту.
Обгорни диспетчеризацію в `try/catch` (або `.catch()`), як це робить тут `makeServer`.

---

## Вправи

Відкрий [`src/exercises.ts`](./src/exercises.ts) і реалізуй кожен `// TODO`. Потім запусти:

```bash
node --import tsx --test "blocks/13-router-and-middleware/tests/*.test.ts"
```

1. `Router` — реалізуй `get(path, h)`, `post(path, h)` і `handle(req, res)`
   (диспетчеризація або `404` JSON `{ error: "not found" }`).
2. `withLogging(handler, log)` — middleware, що викликає `log("<METHOD> <url>")`, тоді
   делегує `handler`.

(`makeServer` обгортає твій роутер і перетворює кинуті помилки на `500`. Тести
використовують `fetch`.) Потім порівняй з [`solutions/`](./solutions).
