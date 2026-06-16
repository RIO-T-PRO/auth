import type { Request, Response } from "express";
import { env } from "@/config/env.js";

export function getRefreshTokenFromCookie(req: Request): string | undefined {
  return req.cookies?.refreshToken as string | undefined;
}

export function setRefreshTokenCookie(res: Response, token: string): void {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: env.REFRESH_TOKEN_COOKIE_DAYS * 24 * 60 * 60 * 1000,
    path: "/",
  });
}

export function clearRefreshTokenCookie(res: Response): void {
  res.cookie("refreshToken", "", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
  });
}
