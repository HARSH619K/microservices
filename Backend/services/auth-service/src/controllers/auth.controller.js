import jwt from "jsonwebtoken";
import { registerUser, loginUser } from "../services/auth.service.js";

/**
 * POST /auth/register
 */
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    await registerUser({ email, password });

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    if (error.message === "USER_EXISTS") {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    console.error("Register error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * POST /auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await loginUser({ email, password });

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET || "dev-secret",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
  } catch (error) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * GET /auth/validate
 */
export const validateToken = async (req, res) => {
  return res.status(200).json({
    message: "Token is valid",
    user: req.user,
  });
};
