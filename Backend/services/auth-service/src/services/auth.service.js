import bcrypt from "bcryptjs";
import {
  findUserByEmail,
  createUser,
} from "../repositories/user.repository.js";

export const registerUser = async ({ email, password }) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("USER_EXISTS");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return createUser({ email, password: hashedPassword });
};

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  return user;
};
