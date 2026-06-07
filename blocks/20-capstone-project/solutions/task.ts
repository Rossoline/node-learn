// Capstone solution — Task model and helpers.
export type Task = { id: number; title: string; done: boolean };

export function createTask(id: number, title: string): Task {
  return { id, title, done: false };
}

export function completeTask(task: Task): Task {
  return { ...task, done: true };
}
