import { Request, Response } from "express";
import { PrismaClient } from "@/generated/prisma/client.js";
import { RefreshTokenService } from "@/services/refresh-token.service.js";
import { TokensService } from "@/services/tokens.service.js";

export class AuthController {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly tokensService: TokensService,
  ) {}

  refresh = async (req: Request, res: Response): Promise<Response> => {
    const refreshToken =
      req.body?.refresh_token ??
      this.tokensService.getRefreshTokenFromCookie(req);

    if (!refreshToken) {
      return res.status(400).json({ error: "Missing refresh_token" });
    }

    try {
      const tokens = await this.refreshTokenService.rotate(refreshToken);
      return res.json(tokens);
    } catch (error: any) {
      return res.status(401).json({ error: error.message || "Refresh failed" });
    }
  };

  userinfo = async (req: Request, res: Response): Promise<Response> => {
    const auth = (req as any).auth as { id: string };

    const user = await this.prisma.user.findUnique({
      where: { id: auth.id },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        googleAccount: {
          select: {
            googleSub: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      sub: user.googleAccount?.googleSub ?? user.id,
      email: user.email,
      name: user.name,
      picture: user.avatarUrl,
    });
  };

  logout = async (req: Request, res: Response): Promise<Response> => {
    const refreshToken =
      req.body?.refresh_token ??
      this.tokensService.getRefreshTokenFromCookie(req);

    if (!refreshToken) {
      return res.status(400).json({ error: "Missing refresh_token" });
    }

    await this.refreshTokenService.logout(refreshToken);
    this.tokensService.clearRefreshTokenCookie(res);

    return res.json({ success: true });
  };
}
