import { describe, expect, it } from "bun:test";
import request from "supertest";
import { createApp } from "@/app";

const app = createApp();

describe("app", () => {
  it("GET /health/live returns ok", async () => {
    const res = await request(app).get("/health/live");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.headers["x-request-id"]).toBeDefined();
  });

  it("returns 404 envelope for unknown routes", async () => {
    const res = await request(app).get("/nope");
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ success: false, error: { code: "NOT_FOUND" } });
  });

  it("rejects unauthenticated access to /api/v1/users/me", async () => {
    const res = await request(app).get("/api/v1/users/me");
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe("UNAUTHORIZED");
  });

  it("returns 400 for malformed JSON", async () => {
    const res = await request(app)
      .patch("/api/v1/users/me")
      .set("content-type", "application/json")
      .send("{bad json");
    expect(res.status).toBe(400);
  });

  it("rejects malformed usernames before touching the database", async () => {
    const res = await request(app)
      .post("/api/auth/is-username-available")
      .set("Origin", "http://localhost:8081")
      .send({ username: "no spaces!" });
    expect(res.status).toBe(422);
    expect(res.body.code).toBe("INVALID_USERNAME");
  });
});
