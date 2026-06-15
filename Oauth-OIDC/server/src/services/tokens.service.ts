import jwt from "jsonwebtoken";
import crypto from "crypto";
import type { Request, Response } from "express";
import { env } from "@/config/env.js";

export class TokensService {
  generateAccessToken(userId: string): string {
    return jwt.sign({ id: userId }, env.JWT_ACCESS_SECRET, {
      expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  generateRefreshToken(userId: string): string {
    return jwt.sign({ id: userId }, env.JWT_REFRESH_SECRET, {
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
    });
  }

  hashToken(token: string): string {
    return crypto.createHash("sha256").update(token).digest("hex");
  }

  // Optional: verify methods for completeness
  verifyAccessToken(token: string): { id: string; iat: number; exp: number } {
    return jwt.verify(token, env.JWT_ACCESS_SECRET) as {
      id: string;
      iat: number;
      exp: number;
    };
  }

  verifyRefreshToken(token: string): { id: string; iat: number; exp: number } {
    return jwt.verify(token, env.JWT_REFRESH_SECRET) as {
      id: string;
      iat: number;
      exp: number;
    };
  }

  // --- Cookie helpers  ---
  async getRefreshTokenFromCookie(req: Request): Promise<string | undefined> {
    return req.cookies?.refreshToken as string | undefined;
  }

  setRefreshTokenCookie(res: Response, token: string): void {
    res.cookie("refreshToken", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: env.REFRESH_TOKEN_COOKIE_DAYS * 24 * 60 * 60 * 1000,
    });
  }

  clearRefreshTokenCookie(res: Response): void {
    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
    });
  }
}
