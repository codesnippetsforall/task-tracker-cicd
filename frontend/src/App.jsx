import { useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "./api";
import { TaskItem } from "./TaskItem";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadTasks() {
    setError("");
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    setSaving(true);
    setError("");
    try {
      const task = await createTask(trimmed);
      setTasks((prev) => [...prev, task]);
      setTitle("");
    } catch (err) {
      setError(err.message || "Failed to add task");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(task) {
    setError("");
    try {
      const updated = await updateTask(task.id, { done: !task.done });
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      setError(err.message || "Failed to update task");
    }
  }

  async function handleDelete(id) {
    setError("");
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete task");
    }
  }

  const remaining = tasks.filter((t) => !t.done).length;

  return (
    <div className="app">
      <header className="header">
        <p className="eyebrow">CI/CD Lab</p>
        <h1>Task Tracker</h1>
        <p className="lede">
          Add tasks, mark them done, and practice shipping through GitHub Actions.
        </p>
      </header>

      <main className="panel">
        <form className="add-form" onSubmit={handleSubmit}>
          <label htmlFor="task-title" className="sr-only">
            New task
          </label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs doing?"
            autoComplete="off"
          />
          <button type="submit" disabled={saving || !title.trim()}>
            Add
          </button>
        </form>

        {error ? <p className="error" role="alert">{error}</p> : null}

        {loading ? (
          <p className="muted">Loading tasks…</p>
        ) : tasks.length === 0 ? (
          <p className="muted">No tasks yet. Add one above.</p>
        ) : (
          <>
            <ul className="task-list">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))}
            </ul>
            <p className="footer-meta">
              {remaining} remaining · {tasks.length} total
            </p>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
