import prisma from "../config/database.js";

export const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async ({ email, password }) => {
  return prisma.user.create({
    data: {
      email,
      password,
    },
  });
};
