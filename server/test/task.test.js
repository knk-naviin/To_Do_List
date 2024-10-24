const request = require("supertest");
const app = require("../server");

describe("Task API", () => {
  it("should create a new task", async () => {
    const res = await request(app).post("/api/tasks").send({
      title: "Test Task",
      description: "Test Description",
      column: "To Do",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("title", "Test Task");
  });
});
