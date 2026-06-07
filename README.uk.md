# Node.js in a Month 🟢

[English](./README.md) · **Українська**

> ℹ️ Джерело істини — англійська версія ([README.md](./README.md)); український переклад може незначно відставати.

> Вивчай **Node.js** так, як насправді ним опановують: будуючи. 20 практичних,
> **тест-орієнтованих** блоків строгим **TypeScript**, із тестуванням **вбудованим** у Node
> раннером `node:test` — без жодного тест-фреймворку для встановлення.

[![Node 22+](https://img.shields.io/badge/Node-22%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tested with node:test](https://img.shields.io/badge/tested%20with-node%3Atest-339933?logo=node.js&logoColor=white)](https://nodejs.org/api/test.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Use this template](https://img.shields.io/badge/Use%20this%20template-2ea44f?logo=github&logoColor=white)](https://github.com/Rossoline/node-learn/generate)

Повний безкоштовний курс для **JavaScript/TypeScript-розробників, що вивчають рантайм
Node.js** — модулі, файлова система, потоки (streams), події, HTTP-сервери, CLI тощо. Ти не
читаєш про API; ти реалізуєш функції, робиш червоні тести зеленими й тримаєш компілятор
задоволеним за `strict`.

> 🧩 Йде в парі з курсом-побратимом
> **[TypeScript in a Month](https://github.com/Rossoline/typescript-learn)** — систему типів
> вивчай там, рантайм — тут.

## Чому цей курс

- 🧪 **Тест-орієнтований** — кожен блок постачає `node:test`-тести, що падають; ти робиш їх
  зеленими.
- 🟢 **Нуль тест-залежностей** — вбудований раннер Node і `assert`, тож ти вчиш платформу, а
  не фреймворк.
- 🔒 **Строгий TypeScript** — `strict`, `noUncheckedIndexedAccess` та інші, запуск через
  `tsx` (без кроку збірки).
- ✅ **Перевірені рішення** — кожне еталонне рішення саме протестоване
  (`npm run test:solutions`).
- 🛠️ **Реальна дуга** — основи → fs/streams/events → HTTP API → CLI-проєкт.

## Використай цей шаблон

Це GitHub **template-репозиторій** — натисни **[Use this template](https://github.com/Rossoline/node-learn/generate)**,
щоб отримати власну копію, у яку комітитимеш рішення.

---

## Швидкий старт

```bash
# 1. Створи свою копію (Use this template) або клонуй
git clone https://github.com/Rossoline/node-learn.git
cd node-learn

# 2. Встанови dev-залежності (потрібен Node 22+)
npm install

# 3. Запусти всі тести — більшість падає, поки не розвʼяжеш вправи
npm test

# 4. Перевір типи всього проєкту
npm run typecheck
```

### Рекомендований процес на блок

1. Прочитай `README.md` блоку.
2. Запусти `src/examples.ts`, щоб побачити ідеї в дії:
   ```bash
   npm run play blocks/01-getting-started/src/examples.ts
   ```
3. Реалізуй кожен `// TODO` у `src/exercises.ts`.
4. Ганяй тести блоку, доки не зелені:
   ```bash
   node --import tsx --test "blocks/01-getting-started/tests/*.test.ts"
   ```
5. Перевір типи, тоді порівняй із `solutions/`.

---

## Що в кожному блоці

```
blocks/NN-topic/
├── README.md          # тема з прикладами та списком вправ
├── src/examples.ts    # робочі приклади, що запускаються
├── src/exercises.ts   # практичні задачі з заглушками // TODO — твоя робота
├── tests/             # тести node:test — зроби їх зеленими
└── solutions/         # еталонні рішення (спершу спробуй сам!)
```

## Програма коротко

Повний план по днях — у **[PLAN.md](./PLAN.md)** ([українською](./PLAN.uk.md)). Двадцять
блоків на чотири тижні:

| Тиждень | Тема | Блоки |
|---------|------|-------|
| 1 | Основи Node | 01 Перші кроки · 02 Модулі та npm · 03 Шляхи · 04 Асинхронність · 05 Помилки та процес |
| 2 | Системний I/O | 06 Читання файлів · 07 Запис файлів · 08 Потоки · 09 Події · 10 Buffer та кодування |
| 3 | HTTP-сервіс | 11 HTTP-сервер · 12 Запити та JSON API · 13 Роутер та middleware · 14 Конфіг · 15 Файлове сховище |
| 4 | Практичний Node | 16 Дочірні процеси · 17 CLI · 18 Тестування · 19 Пакування · 20 Підсумковий проєкт |

## Скрипти

| Команда | Що робить |
|---------|-----------|
| `npm test` | Запустити тести всіх блоків (твій прогрес). |
| `npm run typecheck` | Перевірити типи всього проєкту (`tsc --noEmit`). |
| `npm run test:solutions` | Перевірити, що всі еталонні рішення проходять. |
| `npm run play <file>` | Запустити будь-який `.ts` файл через `tsx`. |

---

## Як працює тестування

Кожен файл вправ експортує функції; відповідний тест імпортує їх і перевіряє поведінку через
`node:test` + `node:assert/strict`. Реалізуй `// TODO` правильно — і його тест зеленіє, за
`strict`, з компілятором на твоєму боці.

Якщо це допомогло тобі вивчити Node — постав ⭐ репозиторію. **Успішної збірки!** 🛠️
