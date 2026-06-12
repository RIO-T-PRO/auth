import { env } from "@/config/env.js";
import { Response } from "express";

const isProduction = process.env.NODE_ENV === "production";

export const setRefreshTokenCookie = (
  res: Response,
  refreshToken: string,
): void => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: env.REFRESH_TOKEN_EXPIRES_IN * 1000,
    path: "/auth",
  });
};

export const clearRefreshTokenCookie = (res: Response): void => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    path: "/auth",
  });
};
