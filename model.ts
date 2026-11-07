export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

export function addTask(tasks: Task[], title: string): Task[] {
  const nextId = tasks.reduce((highestId, task) => Math.max(highestId, task.id), 0) + 1;
  const newTask: Task = { id: nextId, title, status: "todo" };

  return [...tasks, newTask];
}

export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) => (task.id === id ? { ...task, status: "done" } : task));
}

export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((task) => task.status === status);
}

// Extra operation: move a task through the workflow without mutating the input array.
export function advanceTask(tasks: Task[], id: number): Task[] {
  const nextStatus: Record<TaskStatus, TaskStatus> = {
    todo: "in-progress",
    "in-progress": "done",
    done: "done"
  };

  return tasks.map((task) => (
    task.id === id ? { ...task, status: nextStatus[task.status] } : task
  ));
}

// Type checks used during development (intentionally left commented out):
// const missingStatus: Task = { id: 1, title: "Plan sprint" };
// const stringId: Task = { id: "3", title: "Plan sprint", status: "todo" };
// filterByStatus([], "finished");
