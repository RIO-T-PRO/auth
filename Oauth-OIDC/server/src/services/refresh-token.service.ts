import { PrismaClient } from "@/generated/prisma/client.js";
import { env } from "@/config/env.js";
import { RefreshTokenRepo } from "@/database/repositories/refresh-token.repo.js";
import {
  verifyRefreshToken,
  generateRefreshToken,
  hashToken,
  generateAccessToken,
} from "@/utils/index.js";

export class RefreshTokenService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly refreshTokenRepo: RefreshTokenRepo,
  ) {}

  async rotate(refreshToken: string) {
    let payload: { id: string };
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new Error("Invalid refresh token");
    }

    const record = await this.refreshTokenRepo.findByToken(refreshToken);
    if (!record || record.revoked || record.expiresAt < new Date()) {
      throw new Error("Invalid refresh token");
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.refreshToken.update({
        where: { id: record.id },
        data: { revoked: true },
      });

      const newRefreshToken = generateRefreshToken(payload.id);

      await tx.refreshToken.create({
        data: {
          userId: payload.id,
          tokenHash: hashToken(newRefreshToken),
          expiresAt: new Date(Date.now() + env.REFRESH_TOKEN_EXPIRES_IN * 1000),
          rotatedFromId: record.id,
        },
      });

      const accessToken = generateAccessToken(payload.id);

      return {
        token_type: "Bearer",
        expires_in: env.ACCESS_TOKEN_EXPIRES_IN,
        access_token: accessToken,
        refresh_token: newRefreshToken,
      };
    });
  }

  async logout(refreshToken: string) {
    const record = await this.refreshTokenRepo.findByToken(refreshToken);
    if (record) {
      await this.refreshTokenRepo.revokeById(record.id);
    }
  }
}
