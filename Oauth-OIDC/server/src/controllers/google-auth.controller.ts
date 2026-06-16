import { Request, Response } from "express";
import { GoogleOAuthService } from "@/services/google-oauth.service.js";
import { UserRepo } from "@/database/repositories/user.repo.js";
import { GoogleAccountRepo } from "@/database/repositories/google-account.repo.js";
import { RefreshTokenRepo } from "@/database/repositories/refresh-token.repo.js";
import { env } from "@/config/env.js";
import {
  generateAccessToken,
  generateRefreshToken,
  setRefreshTokenCookie,
} from "@/utils/index.js";

export class GoogleAuthController {
  constructor(
    private readonly googleOAuthService: GoogleOAuthService,
    private readonly userRepo: UserRepo,
    private readonly googleAccountRepo: GoogleAccountRepo,
    private readonly refreshTokenRepo: RefreshTokenRepo,
  ) {}

  authorize = (_req: Request, res: Response): void => {
    const url = this.googleOAuthService.authorizeUrl();
    res.redirect(url);
  };

  callback = async (req: Request, res: Response): Promise<Response | void> => {
    const code = req.query.code as string | undefined;

    if (!code) {
      return res.status(400).json({ error: "Missing authorization code" });
    }

    try {
      const tokenSet =
        await this.googleOAuthService.exchangeCodeForTokens(code);
      const claims = await this.googleOAuthService.verifyIdToken(
        tokenSet.id_token,
      );
      const profile = await this.googleOAuthService.fetchUserInfo(
        tokenSet.access_token,
      );

      const email = profile.email ?? claims.email;
      if (!email) {
        return res
          .status(400)
          .json({ error: "Google account email is missing" });
      }

      if (profile.email_verified === false || claims.email_verified === false) {
        return res.status(400).json({ error: "Google email is not verified" });
      }

      // Upsert user and Google account (unchanged)
      const user = await this.userRepo.upsertFromGoogle({
        email,
        name: profile.name ?? claims.name ?? null,
        avatarUrl: profile.picture ?? claims.picture ?? null,
        googleSub: claims.sub,
        accessToken: tokenSet.access_token,
        refreshToken: tokenSet.refresh_token ?? null,
        tokenType: tokenSet.token_type,
        scope: tokenSet.scope ?? null,
        expiresAt: new Date(Date.now() + tokenSet.expires_in * 1000),
      });

      await this.googleAccountRepo.upsertByUserId({
        userId: user.id,
        googleSub: claims.sub,
        accessToken: tokenSet.access_token,
        refreshToken: tokenSet.refresh_token ?? null,
        tokenType: tokenSet.token_type,
        scope: tokenSet.scope ?? null,
        expiresAt: new Date(Date.now() + tokenSet.expires_in * 1000),
      });

      // Create tokens for  API
      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      await this.refreshTokenRepo.create({
        userId: user.id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + env.REFRESH_TOKEN_EXPIRES_IN * 1000),
      });

      // Set the refresh token cookie (for future /auth/refresh calls)
      setRefreshTokenCookie(res, refreshToken);

      return res.redirect(env.FRONTEND_URL);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Google authentication failed" });
    }
  };
}
