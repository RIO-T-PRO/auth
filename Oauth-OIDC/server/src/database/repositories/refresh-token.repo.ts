import { PrismaClient } from "@/generated/prisma/client.js";
import { hashToken } from "@/utils/index.js";

export class RefreshTokenRepo {
  constructor(private readonly prisma: PrismaClient) {}

  async create(input: {
    userId: string;
    token: string;
    expiresAt: Date;
    rotatedFromId?: string | null;
  }) {
    return this.prisma.refreshToken.create({
      data: {
        userId: input.userId,
        tokenHash: hashToken(input.token),
        expiresAt: input.expiresAt,
        rotatedFromId: input.rotatedFromId ?? null,
      },
    });
  }

  async findByToken(token: string) {
    return this.prisma.refreshToken.findUnique({
      where: { tokenHash: hashToken(token) }, // direct call
      include: { user: { include: { googleAccount: true } } },
    });
  }

  async revokeById(id: string) {
    return this.prisma.refreshToken.update({
      where: { id },
      data: { revoked: true },
    });
  }
}
