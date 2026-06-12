import { env } from "@/config/env.js";
import jwt from "jsonwebtoken";

export type TokenPayload = {
  userId: string;
};

export type TokenType = "access" | "refresh";

const getSecret = (type: TokenType): string => {
  return type === "access" ? env.ACCESS_TOKEN_SECRET : env.REFRESH_TOKEN_SECRET;
};

export const ACCESS_TOKEN_EXPIRES_IN = env.ACCESS_TOKEN_EXPIRES_IN ?? 900;
export const REFRESH_TOKEN_EXPIRES_IN = env.REFRESH_TOKEN_EXPIRES_IN ?? 604800;

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, getSecret("access"), {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, getSecret("refresh"), {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
};

export const verifyToken = (token: string, type: TokenType): TokenPayload => {
  return jwt.verify(token, getSecret(type)) as TokenPayload;
};

export const getExpiresDate = (expiresInSeconds: number): Date => {
  return new Date(Date.now() + expiresInSeconds * 1000);
};
