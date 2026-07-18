import request from "supertest";
import { createApp } from "./app.js";
import { resetStore } from "./store.js";

describe("Task Tracker API", () => {
  let app;

  beforeEach(() => {
    resetStore();
    app = createApp();
  });

  test("GET /api/health returns ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    // Intentional fail for Phase 2 practice — expect wrong status
    expect(res.body).toEqual({ status: "healthy" });
  });

  test("POST and GET /api/tasks create and list tasks", async () => {
    const created = await request(app)
      .post("/api/tasks")
      .send({ title: "Learn CI" });

    expect(created.status).toBe(201);
    expect(created.body.title).toBe("Learn CI");
    expect(created.body.done).toBe(false);

    const list = await request(app).get("/api/tasks");
    expect(list.status).toBe(200);
    expect(list.body).toHaveLength(1);
    expect(list.body[0].title).toBe("Learn CI");
  });

  test("PATCH and DELETE /api/tasks/:id update and remove", async () => {
    const created = await request(app)
      .post("/api/tasks")
      .send({ title: "Ship CD" });

    const id = created.body.id;

    const patched = await request(app)
      .patch(`/api/tasks/${id}`)
      .send({ done: true });

    expect(patched.status).toBe(200);
    expect(patched.body.done).toBe(true);

    const deleted = await request(app).delete(`/api/tasks/${id}`);
    expect(deleted.status).toBe(204);

    const list = await request(app).get("/api/tasks");
    expect(list.body).toHaveLength(0);
  });
});
