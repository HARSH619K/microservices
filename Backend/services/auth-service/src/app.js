import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "Auth service is running" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
