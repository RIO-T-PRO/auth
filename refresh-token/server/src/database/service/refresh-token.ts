import { prisma } from "../db.js";

export const createRefreshToken = async (
  userId: string,
  token: string,
  expiresAt: Date,
) => {
  return prisma.refreshToken.create({
    data: {
      token,
      expiresAt,
      userId,
    },
  });
};

export const findRefreshToken = async (token: string) => {
  return prisma.refreshToken.findUnique({
    where: {
      token,
    },
    include: {
      user: true,
    },
  });
};

export const findRefreshTokenByUserId = async (userId: string) => {
  return prisma.refreshToken.findUnique({
    where: {
      userId,
    },
  });
};

export const upsertRefreshToken = async (
  userId: string,
  token: string,
  expiresAt: Date,
) => {
  return prisma.refreshToken.upsert({
    where: {
      userId,
    },
    update: {
      token,
      expiresAt,
    },
    create: {
      userId,
      token,
      expiresAt,
    },
  });
};

export const deleteRefreshToken = async (userId: string) => {
  return prisma.refreshToken.deleteMany({
    where: {
      userId,
    },
  });
};
