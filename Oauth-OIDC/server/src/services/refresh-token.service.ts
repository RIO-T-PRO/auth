import { PrismaClient } from "@/generated/prisma/client.js";
import { env } from "@/config/env.js";
import { RefreshTokenRepo } from "@/database/repositories/refresh-token.repo.js";
import { TokensService } from "@/services/tokens.service.js";

export class RefreshTokenService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly refreshTokenRepo: RefreshTokenRepo,
    private readonly tokensService: TokensService,
  ) {}

  async rotate(refreshToken: string) {
    // Verify and decode the incoming refresh token
    let payload: { id: string };
    try {
      payload = this.tokensService.verifyRefreshToken(refreshToken);
    } catch {
      throw new Error("Invalid refresh token");
    }

    // Check if token exists in DB, not revoked, not expired
    const record = await this.refreshTokenRepo.findByToken(refreshToken);
    if (!record || record.revoked || record.expiresAt < new Date()) {
      throw new Error("Invalid refresh token");
    }

    return this.prisma.$transaction(async (tx) => {
      // Revoke old token
      await tx.refreshToken.update({
        where: { id: record.id },
        data: { revoked: true },
      });

      // Generate new refresh token (JWT) for the same user
      const newRefreshToken = this.tokensService.generateRefreshToken(
        payload.id,
      );

      // Store hashed version in DB
      await tx.refreshToken.create({
        data: {
          userId: payload.id,
          tokenHash: this.tokensService.hashToken(newRefreshToken),
          expiresAt: new Date(Date.now() + env.REFRESH_TOKEN_EXPIRES_IN * 1000),
          rotatedFromId: record.id,
        },
      });

      // Generate new access token
      const accessToken = this.tokensService.generateAccessToken(payload.id);

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
