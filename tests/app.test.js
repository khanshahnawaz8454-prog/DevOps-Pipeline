const request = require("supertest");
const app = require("../app/server");

describe("DevOps Pipeline Application", () => {
  test("Home endpoint returns application information", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.application).toBe("DevOps Pipeline Demo");
    expect(response.body.status).toBe("running");
  });

  test("Health endpoint returns healthy status", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("healthy");
  });

  test("Readiness endpoint returns ready status", async () => {
    const response = await request(app).get("/ready");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("ready");
  });

  test("Unknown endpoint returns 404", async () => {
    const response = await request(app).get("/unknown");

    expect(response.statusCode).toBe(404);
  });
});
