# TypeTasks (Part 1: Typed Logic Layer)

A type-safe task tracker built in TypeScript. This repository contains Part 1 of the TypeTasks project — the strongly-typed data model and core immutable operations.

## Data Model & Types

### `TaskStatus`
Literal union restricting task statuses to:
```typescript
type TaskStatus = "todo" | "in-progress" | "done";
```

### `Task` Interface
Defines the exact shape of a task:
```typescript
interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}
```

## Core Operations

1. **`addTask(tasks: Task[], title: string): Task[]`**
   - Appends a new task with a unique incremental ID and initial status `"todo"`.
   - Returns a new array without mutating input.

2. **`completeTask(tasks: Task[], id: number): Task[]`**
   - Updates the matching task's status to `"done"`.
   - Returns a new array with updated status.

3. **`filterByStatus(tasks: Task[], status: TaskStatus): Task[]`**
   - Filters tasks strictly by `TaskStatus`.
   - Passing an invalid status (e.g. `"finished"`) produces a compile error.

## Custom Typed Operations (Make It Yours)

- **`deleteTask(tasks: Task[], id: number): Task[]`**: Immutably removes a task by ID.
- **`advanceTask(tasks: Task[], id: number): Task[]`**: Advances task lifecycle (`"todo"` &rarr; `"in-progress"` &rarr; `"done"`).
- **`countByStatus(tasks: Task[], status: TaskStatus): number`**: Returns the count of tasks matching a given status.
- **`updateTaskTitle(tasks: Task[], id: number, newTitle: string): Task[]`**: Updates the task title while preserving ID and status.
- **`clearCompletedTasks(tasks: Task[]): Task[]`**: Clears all tasks marked as `"done"`.

## Verification & Compilation

Compile the project cleanly with zero TypeScript errors:
```bash
npm run build
```
or
```bash
npx tsc
```
