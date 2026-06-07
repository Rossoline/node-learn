# Блок 03 — Шляхи та розташування

[English](./README.md) · **Українська**

> ℹ️ Джерело істини — англійська версія ([README.md](./README.md)); український переклад може незначно відставати.

Шляхи до файлів різняться між операційними системами (`/` на macOS/Linux, `\` на Windows).
Модуль `node:path` будує й парсить їх **портативно** — ніколи не склеюй шляхи руками.

## `node:path`

```ts
import { join, resolve, basename, extname, dirname } from "node:path";

join("src", "app", "index.ts");   // "src/app/index.ts"  (або "src\\app\\index.ts" на Windows)
resolve("src", "index.ts");        // абсолютний шлях від поточної теки (cwd)
basename("/usr/bin/node");         // "node"
extname("archive.tar.gz");         // ".gz"
dirname("/usr/bin/node");          // "/usr/bin"
```

- **`join`** склеює сегменти правильним роздільником і нормалізує `.`/`..`.
- **`resolve`** дає абсолютний шлях (розвʼязуючи від поточної теки).
- **`basename` / `dirname` / `extname`** розбирають шлях на частини.

## `import.meta.url` і відтворення `__dirname`

У CommonJS були магічні глобали `__dirname` і `__filename`. **В ES-модулях їх немає** —
натомість кожен модуль знає власний URL через `import.meta.url`. Перетвори його на шлях
через `node:url`:

```ts
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

`import.meta.url` — це рядок `file://`-URL; `fileURLToPath` перетворює його на справжній
OS-шлях (обробляючи літери дисків, кодування тощо), тож ніколи не парсь його руками.

> У зворотний бік — зі шляху в URL — використовуй `pathToFileURL(p)` із `node:url`.

---

## Вправи

Відкрий [`src/exercises.ts`](./src/exercises.ts) і реалізуй кожен `// TODO` через
`node:path` / `node:url`. Потім запусти:

```bash
node --import tsx --test "blocks/03-paths-and-locations/tests/*.test.ts"
```

1. `joinPath(...segments)` — портативно зʼєднати сегменти шляху (`node:path` `join`).
2. `fileExtension(filename)` — повернути розширення з крапкою (`extname`).
3. `currentDir(fileUrl)` — за `file://`-URL (як `import.meta.url`) повернути **теку**, що
   його містить (`fileURLToPath` + `dirname`).

Потім порівняй з [`solutions/`](./solutions).
