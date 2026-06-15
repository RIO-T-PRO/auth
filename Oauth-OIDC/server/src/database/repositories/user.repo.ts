import { PrismaClient } from "@/generated/prisma/client.js";

export class UserRepo {
  constructor(private readonly prisma: PrismaClient) {}

  async findId(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { googleAccount: true },
    });
  }

  async findEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async upsertFromGoogle(input: {
    email: string;
    name?: string | null;
    avatarUrl?: string | null;
    googleSub: string;
    accessToken: string;
    refreshToken?: string | null;
    tokenType?: string | null;
    scope?: string | null;
    expiresAt?: Date | null;
  }) {
    return this.prisma.user.upsert({
      where: { email: input.email },
      update: {
        name: input.name ?? undefined,
        avatarUrl: input.avatarUrl ?? undefined,
        googleAccount: {
          upsert: {
            create: {
              googleSub: input.googleSub,
              accessToken: input.accessToken,
              refreshToken: input.refreshToken ?? null,
              tokenType: input.tokenType ?? null,
              scope: input.scope ?? null,
              expiresAt: input.expiresAt ?? null,
            },
            update: {
              googleSub: input.googleSub,
              accessToken: input.accessToken,
              refreshToken: input.refreshToken ?? null,
              tokenType: input.tokenType ?? null,
              scope: input.scope ?? null,
              expiresAt: input.expiresAt ?? null,
            },
          },
        },
      },
      create: {
        email: input.email,
        name: input.name ?? null,
        avatarUrl: input.avatarUrl ?? null,
        googleAccount: {
          create: {
            googleSub: input.googleSub,
            accessToken: input.accessToken,
            refreshToken: input.refreshToken ?? null,
            tokenType: input.tokenType ?? null,
            scope: input.scope ?? null,
            expiresAt: input.expiresAt ?? null,
          },
        },
      },
      include: { googleAccount: true },
    });
  }
}
