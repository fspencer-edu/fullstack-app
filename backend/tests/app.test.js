const request = require("supertest");

jest.mock("../src/db", () => ({
  query: jest.fn(async (sql) => {
    if (sql.includes("SELECT 1")) {
      return { rows: [{ "?column?": 1 }] };
    }

    if (sql.includes("FROM users")) {
      return {
        rows: [
          { id: 1, name: "Alice", email: "alice@example.com" },
          { id: 2, name: "Bob", email: "bob@example.com" }
        ]
      };
    }

    return { rows: [] };
  })
}));

jest.mock("../src/redis", () => ({
  ping: jest.fn(async () => "PONG"),
  get: jest.fn(async () => null),
  set: jest.fn(async () => "OK")
}));

const app = require("../src/app");

describe("API", () => {
  test("GET /health returns ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  test("GET /api/info returns app info", async () => {
    const res = await request(app).get("/api/info");
    expect(res.statusCode).toBe(200);
    expect(res.body.app).toBe("fullstack-app");
  });

  test("GET /api/users returns users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });
});