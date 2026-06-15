import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "@/config/env.js";

export function generateAccessToken(userId: string): string {
  return jwt.sign({ id: userId }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
  });
}

export function generateRefreshToken(userId: string): string {
  return jwt.sign({ id: userId }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
  });
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function verifyAccessToken(token: string): {
  id: string;
  iat: number;
  exp: number;
} {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as {
    id: string;
    iat: number;
    exp: number;
  };
}

export function verifyRefreshToken(token: string): {
  id: string;
  iat: number;
  exp: number;
} {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as {
    id: string;
    iat: number;
    exp: number;
  };
}
