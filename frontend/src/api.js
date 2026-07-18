const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  if (res.status === 204) return null;

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export function fetchTasks() {
  return request("/api/tasks");
}

export function createTask(title) {
  return request("/api/tasks", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}

export function updateTask(id, updates) {
  return request(`/api/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
}

export function deleteTask(id) {
  return request(`/api/tasks/${id}`, { method: "DELETE" });
}
