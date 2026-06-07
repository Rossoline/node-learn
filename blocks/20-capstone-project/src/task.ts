// Capstone — Task model and pure helpers.
export type Task = { id: number; title: string; done: boolean };

// 2a. Create a new (not-done) task.
export function createTask(id: number, title: string): Task {
  void id;
  void title; // remove these lines once you use the parameters
  // TODO: return { id, title, done: false }
  throw new Error("Not implemented");
}

// 2b. Return a copy of the task marked done (don't mutate the input).
export function completeTask(task: Task): Task {
  void task; // remove this line once you use the parameter
  // TODO: return { ...task, done: true }
  throw new Error("Not implemented");
}
