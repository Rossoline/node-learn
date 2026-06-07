// Capstone solution — CLI over the task store.
import type { TaskStore } from "./store.ts";

export type CliResult = { output: string; exitCode: number };

export async function runCli(
  store: TaskStore,
  args: string[],
): Promise<CliResult> {
  const [command, ...rest] = args;

  if (command === "list") {
    const tasks = await store.all();
    const output = tasks
      .map((t) => `[${t.done ? "x" : " "}] ${t.id}. ${t.title}`)
      .join("\n");
    return { output, exitCode: 0 };
  }

  if (command === "add") {
    const task = await store.add(rest.join(" "));
    return { output: `added #${task.id}: ${task.title}`, exitCode: 0 };
  }

  if (command === "done") {
    const result = await store.complete(Number(rest[0]));
    if (!result.ok) return { output: result.error, exitCode: 1 };
    return { output: `completed #${result.value.id}`, exitCode: 0 };
  }

  return { output: `unknown command: ${command ?? ""}`, exitCode: 1 };
}

// Notes:
// - The CLI is the second consumer of the same store — proof the core logic lives in
//   store.ts, not duplicated per interface.
// - "done" surfaces the store's Result as output + a non-zero exit code (block 05).
