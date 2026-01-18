import { Router } from "express";
import {
  register,
  login,
  validateToken,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

// ✅ NO /auth here
router.post("/register", register);
router.post("/login", login);
router.get("/validate", authenticate, validateToken);

export default router;
