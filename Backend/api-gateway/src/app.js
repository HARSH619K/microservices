import express from "express";
import { authProxy } from "./routes/auth.routes.js";

const app = express();

// ✅ ENABLE body parsing again
app.use(express.json());

app.use("/api/auth", authProxy);

app.get("/health", (req, res) => {
  res.json({ status: "gateway ok" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
