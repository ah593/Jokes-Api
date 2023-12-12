//Althesia Hylton | IT302-001 | 11/17/2023 | Unit 9 Assignment | ah593@njit.edu
import express from "express";
import cors from "cors";
import jokes from "./api/jokes.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/ah593", jokes);

app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;
