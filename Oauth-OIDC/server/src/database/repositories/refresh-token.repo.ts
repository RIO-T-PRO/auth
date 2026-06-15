import { PrismaClient } from "@/generated/prisma/client.js";
import { TokensService } from "@/services/tokens.service.js";

export class RefreshTokenRepo {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly tokensService: TokensService,
  ) {}

  async create(input: {
    userId: string;
    token: string;
    expiresAt: Date;
    rotatedFromId?: string | null;
  }) {
    return this.prisma.refreshToken.create({
      data: {
        userId: input.userId,
        tokenHash: this.tokensService.hashToken(input.token),
        expiresAt: input.expiresAt,
        rotatedFromId: input.rotatedFromId ?? null,
      },
    });
  }

  async findByToken(token: string) {
    return this.prisma.refreshToken.findUnique({
      where: { tokenHash: this.tokensService.hashToken(token) },
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
