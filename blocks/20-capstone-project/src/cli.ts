// Capstone — CLI over the task store.
import type { TaskStore } from "./store.ts";

export type CliResult = { output: string; exitCode: number };

// 4b. Run a CLI command against the store:
//     list           -> each task as "[ ] <id>. <title>" ([x] when done), joined by "\n"
//     add <title...>  -> add it, output "added #<id>: <title>"
//     done <id>       -> complete it; on success "completed #<id>", else the error + exit 1
//     anything else   -> "unknown command: <cmd>" + exit 1
export async function runCli(
  store: TaskStore,
  args: string[],
): Promise<CliResult> {
  void store;
  void args; // remove these lines once you use the parameters
  // TODO: read the command + rest from args; dispatch to the store; return { output, exitCode }
  throw new Error("Not implemented");
}
