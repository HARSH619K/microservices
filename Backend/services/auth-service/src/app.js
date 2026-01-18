import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use((req, res, next) => {
  console.log("AUTH SERVICE HIT:", req.method, req.path);
  next();
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "Auth service is running" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
