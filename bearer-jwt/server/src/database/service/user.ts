import { User } from "@/generated/prisma/client.js";
import { prisma } from "../db.js";

export const createUser = async (
  name: string,
  email: string,
  passwordHash: string,
): Promise<User> => {
  return prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
    },
  });
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const findUserById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id },
  });
};
