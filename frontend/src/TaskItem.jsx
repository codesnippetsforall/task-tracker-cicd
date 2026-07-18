export function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item${task.done ? " is-done" : ""}`}>
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task)}
          aria-label={`Mark "${task.title}" as ${task.done ? "not done" : "done"}`}
        />
        <span className="task-title">{task.title}</span>
      </label>
      <button
        type="button"
        className="btn-delete"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.title}`}
      >
        Delete
      </button>
    </li>
  );
}
