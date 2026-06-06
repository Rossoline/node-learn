// Block 15 — File-Backed Store: worked examples
// Run me:  npm run play blocks/15-file-backed-store/src/examples.ts
export {}; // make this a module so top-level names don't clash across blocks

import { readFile, writeFile, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

type Note = { id: number; text: string };

class FileStore<T extends { id: number }> {
  constructor(private filePath: string) {}

  private async load(): Promise<T[]> {
    try {
      return JSON.parse(await readFile(this.filePath, "utf8")) as T[];
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw err;
    }
  }
  private async save(items: T[]): Promise<void> {
    await writeFile(this.filePath, JSON.stringify(items, null, 2));
  }

  async all(): Promise<T[]> {
    return this.load();
  }
  async add(item: T): Promise<void> {
    const items = await this.load();
    items.push(item);
    await this.save(items);
  }
}

async function main() {
  const dir = await mkdtemp(join(tmpdir(), "node-learn-15-"));
  try {
    const store = new FileStore<Note>(join(dir, "notes.json"));
    console.log("empty:", await store.all()); // [] (file not created yet)
    await store.add({ id: 1, text: "hello" });
    await store.add({ id: 2, text: "world" });
    console.log("after adds:", await store.all());
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

void main();
