import express from "express";
import cors from "cors";
import {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./store.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/tasks", (_req, res) => {
    res.json(listTasks());
  });

  app.post("/api/tasks", (req, res) => {
    const title = req.body?.title;
    if (!title || !String(title).trim()) {
      return res.status(400).json({ error: "title is required" });
    }
    const task = createTask(title);
    res.status(201).json(task);
  });

  app.patch("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "invalid id" });
    }

    const { title, done } = req.body ?? {};
    if (title === undefined && done === undefined) {
      return res.status(400).json({ error: "provide title and/or done" });
    }

    const task = updateTask(id, { title, done });
    if (!task) {
      return res.status(404).json({ error: "task not found" });
    }
    res.json(task);
  });

  app.delete("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "invalid id" });
    }

    const deleted = deleteTask(id);
    if (!deleted) {
      return res.status(404).json({ error: "task not found" });
    }
    res.status(204).send();
  });

  return app;
}
