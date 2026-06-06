// Block 15 — Exercises
// Run tests:  node --import tsx --test "blocks/15-file-backed-store/tests/*.test.ts"
import { readFile, writeFile } from "node:fs/promises";

export class FileStore<T extends { id: number }> {
  constructor(private filePath: string) {}

  // Given: read the JSON file, treating a missing file as empty.
  private async load(): Promise<T[]> {
    try {
      return JSON.parse(await readFile(this.filePath, "utf8")) as T[];
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw err;
    }
  }

  // Given: write the items back as pretty JSON.
  private async save(items: T[]): Promise<void> {
    await writeFile(this.filePath, JSON.stringify(items, null, 2));
  }

  // 1. Return every stored item.
  async all(): Promise<T[]> {
    // TODO: return this.load()
    throw new Error("Not implemented");
  }

  // 2. Return the item with the given id, or undefined.
  async get(id: number): Promise<T | undefined> {
    void id; // remove this line once you use the parameter
    // TODO: load, then find by id
    throw new Error("Not implemented");
  }

  // 3. Append an item and persist.
  async add(item: T): Promise<void> {
    void item; // remove this line once you use the parameter
    // TODO: load, push, save
    throw new Error("Not implemented");
  }

  // 4. Remove by id. Return true if an item was removed, otherwise false.
  async remove(id: number): Promise<boolean> {
    void id; // remove this line once you use the parameter
    // TODO: load, filter out the id, save if it changed, return whether it changed
    throw new Error("Not implemented");
  }
}
