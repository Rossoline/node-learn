// Block 15 — Reference solutions
// Try the exercises yourself first! Read this only to check your work.
import { readFile, writeFile } from "node:fs/promises";

export class FileStore<T extends { id: number }> {
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

  async get(id: number): Promise<T | undefined> {
    const items = await this.load();
    return items.find((item) => item.id === id);
  }

  async add(item: T): Promise<void> {
    const items = await this.load();
    items.push(item);
    await this.save(items);
  }

  async remove(id: number): Promise<boolean> {
    const items = await this.load();
    const next = items.filter((item) => item.id !== id);
    if (next.length === items.length) return false; // nothing matched
    await this.save(next);
    return true;
  }
}

// Notes:
// - Every method goes through load() so it always sees the on-disk state.
// - remove() compares lengths to report whether anything was actually deleted.
// - The `T extends { id: number }` constraint is what makes get/remove-by-id type-safe.
