// Capstone solution — file-backed task store.
import { readFile, writeFile } from "node:fs/promises";
import { type Task, createTask, completeTask } from "./task.ts";
import { type Result, ok, err } from "./result.ts";

export class TaskStore {
  constructor(private filePath: string) {}

  private async load(): Promise<Task[]> {
    try {
      return JSON.parse(await readFile(this.filePath, "utf8")) as Task[];
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw error;
    }
  }

  private async save(tasks: Task[]): Promise<void> {
    await writeFile(this.filePath, JSON.stringify(tasks, null, 2));
  }

  async all(): Promise<Task[]> {
    return this.load();
  }

  async add(title: string): Promise<Task> {
    const tasks = await this.load();
    const nextId = tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
    const task = createTask(nextId, title);
    tasks.push(task);
    await this.save(tasks);
    return task;
  }

  async complete(id: number): Promise<Result<Task, string>> {
    const tasks = await this.load();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return err(`task ${id} not found`);
    const updated = completeTask(tasks[index]!);
    tasks[index] = updated;
    await this.save(tasks);
    return ok(updated);
  }
}

// Notes:
// - Every method funnels through load()/save(), so the file is the single source of truth.
// - add() derives the next id from the current max (1 for an empty store).
// - complete() returns a Result so callers (API and CLI) handle "not found" explicitly
//   instead of throwing.
