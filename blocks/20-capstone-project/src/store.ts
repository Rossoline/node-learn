// Capstone — file-backed task store.
import { readFile, writeFile } from "node:fs/promises";
import { type Task } from "./task.ts";
import { type Result } from "./result.ts";

export class TaskStore {
  constructor(private filePath: string) {}

  // Given: read the JSON file, treating a missing file as empty.
  private async load(): Promise<Task[]> {
    try {
      return JSON.parse(await readFile(this.filePath, "utf8")) as Task[];
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw err;
    }
  }

  // Given: write the tasks back as pretty JSON.
  private async save(tasks: Task[]): Promise<void> {
    await writeFile(this.filePath, JSON.stringify(tasks, null, 2));
  }

  // 3a. Return every task.
  async all(): Promise<Task[]> {
    void this.load;
    void this.save; // remove these lines once you use the given helpers
    // TODO: return this.load()
    throw new Error("Not implemented");
  }

  // 3b. Add a task with the next id (max existing id + 1, or 1), persist, return it.
  async add(title: string): Promise<Task> {
    void title; // remove this line once you use the parameter
    // TODO: load, compute next id, createTask, push, save, return the task
    throw new Error("Not implemented");
  }

  // 3c. Mark a task done. Return err(`task <id> not found`) if it doesn't exist,
  //     otherwise persist and return ok(updatedTask).
  async complete(id: number): Promise<Result<Task, string>> {
    void id; // remove this line once you use the parameter
    // TODO: load, find by id; if missing -> err; else completeTask, save, ok(updated)
    throw new Error("Not implemented");
  }
}
