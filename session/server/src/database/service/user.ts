import { prisma } from "../db.js";
import { User } from "@/generated/prisma/client.js";

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const findUserById = (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const findUserByUsername = (username: string) => {
  return prisma.user.findUnique({
    where: { username },
  });
};

export const createUser = async (
  username: string,
  email: string,
  password: string,
): Promise<User> => {
  return prisma.user.create({
    data: {
      email,
      username,
      password,
    },
  });
};
