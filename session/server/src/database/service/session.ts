import { Session } from "@/generated/prisma/client.js";
import { prisma } from "../db.js";
import { User } from "@/generated/prisma/browser.js";

export const createSession = (
  userId: string,
  expiresAt: Date,
): Promise<Session> => {
  return prisma.session.create({
    data: {
      userId,
      expiresAt,
    },
  });
};

export const findSessionById = (sessionId: string) => {
  return prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });
};

export const deleteSession = (sessionId: string) => {
  return prisma.session.deleteMany({
    where: {
      id: sessionId,
    },
  });
};
