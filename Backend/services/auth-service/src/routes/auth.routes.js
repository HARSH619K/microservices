import express from "express";
import {
  register,
  login,
  validateToken,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/validate", authenticate, validateToken);

export default router;
