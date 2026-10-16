/**
 * TypeTasks - Part 1: Typed Logic Layer / Data Model
 * A type-safe task tracker data model.
 */

/**
 * TaskStatus literal union.
 * A task's status can only ever be one of three exact values.
 */
export type TaskStatus = "todo" | "in-progress" | "done";

/**
 * Task interface defining the exact shape of a task.
 */
export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

/**
 * Adds a new task to the task list.
 * Returns a new array with a new task appended.
 * The new task has a unique id and an initial status of "todo".
 *
 * @param tasks - The current array of tasks
 * @param title - The title/description of the task
 * @returns A new array of tasks with the added task
 */
export function addTask(tasks: Task[], title: string): Task[] {
  const nextId = tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
  const newTask: Task = {
    id: nextId,
    title,
    status: "todo",
  };
  return [...tasks, newTask];
}

/**
 * Marks a task with the matching id as "done".
 * Returns a new array where the task with the matching id has its status set to "done".
 *
 * @param tasks - The current array of tasks
 * @param id - The id of the task to complete
 * @returns A new array of tasks with the updated task status
 */
export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, status: "done" } : task
  );
}

/**
 * Filters tasks by status.
 * Returns only the tasks whose status matches the provided TaskStatus.
 *
 * @param tasks - The current array of tasks
 * @param status - The TaskStatus to filter by ("todo" | "in-progress" | "done")
 * @returns A new array containing only matching tasks
 */
export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((task) => task.status === status);
}

/* ==========================================================================
 * Extra Typed Operations (Make It Yours)
 * ========================================================================== */

/**
 * Deletes a task by id.
 * Returns a new array omitting the task with the matching id.
 *
 * @param tasks - The current array of tasks
 * @param id - The id of the task to delete
 * @returns A new array with the task removed
 */
export function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((task) => task.id !== id);
}

/**
 * Advances a task's status through its lifecycle:
 * "todo" -> "in-progress" -> "done" (stays "done" once finished).
 *
 * @param tasks - The current array of tasks
 * @param id - The id of the task to advance
 * @returns A new array with the updated task
 */
export function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map((task) => {
    if (task.id !== id) return task;

    let nextStatus: TaskStatus;
    if (task.status === "todo") {
      nextStatus = "in-progress";
    } else {
      nextStatus = "done";
    }

    return { ...task, status: nextStatus };
  });
}

/**
 * Counts the number of tasks having the specified status.
 *
 * @param tasks - The current array of tasks
 * @param status - The TaskStatus to count
 * @returns The number of matching tasks
 */
export function countByStatus(tasks: Task[], status: TaskStatus): number {
  return tasks.filter((task) => task.status === status).length;
}

/**
 * Updates the title of an existing task while preserving its id and status.
 *
 * @param tasks - The current array of tasks
 * @param id - The id of the task to update
 * @param newTitle - The updated task title
 * @returns A new array with the updated task title
 */
export function updateTaskTitle(tasks: Task[], id: number, newTitle: string): Task[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, title: newTitle } : task
  );
}

/**
 * Clears all completed tasks ("done").
 *
 * @param tasks - The current array of tasks
 * @returns A new array containing only tasks that are not yet "done"
 */
export function clearCompletedTasks(tasks: Task[]): Task[] {
  return tasks.filter((task) => task.status !== "done");
}
