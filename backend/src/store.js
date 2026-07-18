/** In-memory task store for learning CI/CD (resets on restart). */

let nextId = 1;
let tasks = [];

export function resetStore() {
  nextId = 1;
  tasks = [];
}

export function listTasks() {
  return [...tasks];
}

export function createTask(title) {
  const task = {
    id: nextId++,
    title: String(title).trim(),
    done: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

export function updateTask(id, updates) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;

  const current = tasks[index];
  const next = { ...current };

  if (updates.title !== undefined) {
    next.title = String(updates.title).trim();
  }
  if (updates.done !== undefined) {
    next.done = Boolean(updates.done);
  }

  tasks[index] = next;
  return next;
}

export function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}
