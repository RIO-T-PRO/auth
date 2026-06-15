import { Router } from "express";

import { prismaService } from "@/database/prisma.service.js";

import { TokensService } from "@/services/tokens.service.js";
import { GoogleOAuthService } from "@/services/google-oauth.service.js";
import { RefreshTokenService } from "@/services/refresh-token.service.js";

import { UserRepo } from "@/database/repositories/user.repo.js";
import { GoogleAccountRepo } from "@/database/repositories/google-account.repo.js";
import { RefreshTokenRepo } from "@/database/repositories/refresh-token.repo.js";

import { AuthController } from "@/controllers/auth.controller.js";
import { GoogleAuthController } from "@/controllers/google-auth.controller.js";

import { verifyAccessToken } from "@/middlewares/verify-access-token.js";

const router = Router();

const tokensService = new TokensService();

const userRepo = new UserRepo(prismaService);

const googleAccountRepo = new GoogleAccountRepo(prismaService);

const refreshTokenRepo = new RefreshTokenRepo(prismaService, tokensService);

const googleOAuthService = new GoogleOAuthService();

const refreshTokenService = new RefreshTokenService(
  prismaService,
  refreshTokenRepo,
  tokensService,
);

const googleAuthController = new GoogleAuthController(
  googleOAuthService,
  userRepo,
  googleAccountRepo,
  refreshTokenRepo,
  tokensService,
);

const authController = new AuthController(
  prismaService,
  refreshTokenService,
  tokensService,
);

router.get("/google/authorize", googleAuthController.authorize);

router.get("/google/callback", googleAuthController.callback);

router.post("/refresh", authController.refresh);

router.get(
  "/userinfo",
  verifyAccessToken(tokensService),
  authController.userinfo,
);

router.post("/logout", authController.logout);

export default router;
