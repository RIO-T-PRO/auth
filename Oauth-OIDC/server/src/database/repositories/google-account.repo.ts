import { PrismaClient } from "@/generated/prisma/client.js";

export type GoogleAccountCreateInput = {
  userId: string;
  googleSub: string;
  accessToken: string;
  refreshToken?: string | null;
  tokenType?: string | null;
  scope?: string | null;
  expiresAt?: Date | null;
};

export class GoogleAccountRepo {
  constructor(private readonly prisma: PrismaClient) {}

  async upsertByUserId(input: GoogleAccountCreateInput) {
    return this.prisma.googleAccount.upsert({
      where: { userId: input.userId },
      update: {
        googleSub: input.googleSub,
        accessToken: input.accessToken,
        refreshToken: input.refreshToken ?? null,
        tokenType: input.tokenType ?? null,
        scope: input.scope ?? null,
        expiresAt: input.expiresAt ?? null,
      },
      create: {
        userId: input.userId,
        googleSub: input.googleSub,
        accessToken: input.accessToken,
        refreshToken: input.refreshToken ?? null,
        tokenType: input.tokenType ?? null,
        scope: input.scope ?? null,
        expiresAt: input.expiresAt ?? null,
      },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.googleAccount.findUnique({
      where: { userId },
    });
  }

  async findByGoogleSub(googleSub: string) {
    return this.prisma.googleAccount.findUnique({
      where: { googleSub },
    });
  }
}
