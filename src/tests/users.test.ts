import request from "supertest";
import app from "../app";
import { prisma } from "../lib/prisma";

describe("Users API", () => {
  let userId: number;

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create a user", async () => {
    const res = await request(app).post("/users").send({ name: "Test", email: "test@example.com" });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test");
    userId = res.body.id;
  });

  it("should get all users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get user by id", async () => {
    const res = await request(app).get(`/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(userId);
  });

  it("should update a user", async () => {
    const res = await request(app).put(`/users/${userId}`).send({ name: "Updated", email: "updated@example.com" });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Updated");
  });

  it("should delete a user", async () => {
    const res = await request(app).delete(`/users/${userId}`);
    expect(res.statusCode).toBe(204);
  });
});