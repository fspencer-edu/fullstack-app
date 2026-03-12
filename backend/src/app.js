const express = require("express");
const cors = require("cors");

const db = require("./db");
const redis = require("./redis");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*"
  })
);

app.get("/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    await redis.ping();
    res.status(200).json({
      status: "ok",
      database: "connected",
      redis: "connected"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
});

app.get("/api/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    await redis.ping();
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ status: "error" });
  }
});

app.get("/api/info", async (req, res) => {
  res.json({
    app: "fullstack-app",
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0"
  });
});

app.get("/api/users", async (req, res) => {
  try {
    const cachedUsers = await redis.get("users");

    if (cachedUsers) {
      return res.json(JSON.parse(cachedUsers));
    }

    const result = await db.query(
      "SELECT id, name, email FROM users ORDER BY id ASC"
    );

    await redis.set("users", JSON.stringify(result.rows), "EX", 60);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch users",
      details: error.message
    });
  }
});

module.exports = app;