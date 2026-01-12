import express from "express";
import {
  register,
  login,
  validateToken,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/validate", authMiddleware, validateToken);

export default router;
