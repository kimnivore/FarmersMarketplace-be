const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const authRouter = require("./auth/auth-router");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/auth", authRouter);

server.get("/", async (req, res) => {
  res.json({ message: "DUMMY GET REQUEST" });
});

server.post("/", async (req, res) => {
  res.json({ message: "DUMMY POST REQUEST" });
});

module.exports = server;
