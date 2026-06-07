// Capstone solution — barrel: the task manager's public API.
export { ok, err } from "./result.ts";
export type { Result } from "./result.ts";
export { createTask, completeTask } from "./task.ts";
export type { Task } from "./task.ts";
export { TaskStore } from "./store.ts";
export { makeServer, handleRequest, sendJson } from "./api.ts";
export { runCli, type CliResult } from "./cli.ts";
