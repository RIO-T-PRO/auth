import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "@/config/env.js";
import { getToken } from "@/config/token.js";
import { TokenPayload, TokenType } from "@/types/token.js";

export const generateToken = (type: TokenType, userId: string): string => {
  const { secret, expiresIn } = getToken(type);
  return jwt.sign({ id: userId }, secret, { expiresIn });
};

export const verifyToken = (type: TokenType, token: string): TokenPayload => {
  const { secret } = getToken(type);
  return jwt.verify(token, secret) as TokenPayload;
};

export const hashToken = (token: string): string => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const getExpiresDate = (expiresInSeconds: number): Date => {
  return new Date(Date.now() + expiresInSeconds * 1000);
};
