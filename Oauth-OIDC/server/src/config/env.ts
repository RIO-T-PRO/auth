import dotenv from "dotenv";

dotenv.config();

const required = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const env = {
  // Server
  PORT: Number(process.env.PORT ?? 8080),

  // Database
  DATABASE_URL: required("DATABASE_URL"),

  // Auth Providers
  GOOGLE_CLIENT_ID: required("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: required("GOOGLE_CLIENT_SECRET"),
  GOOGLE_REDIRECT_URI:
    process.env.GOOGLE_REDIRECT_URI ||
    "http://localhost:8080/auth/google/callback",

  // Frontend
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",

  // JWT Access Token
  ACCESS_TOKEN_SECRET: required("ACCESS_TOKEN_SECRET"),
  ACCESS_TOKEN_EXPIRES_IN: required("ACCESS_TOKEN_EXPIRES_IN"),

  // JWT Refresh Token
  REFRESH_TOKEN_SECRET: required("REFRESH_TOKEN_SECRET"),
  REFRESH_TOKEN_EXPIRES_IN: required("REFRESH_TOKEN_EXPIRES_IN"),

  // Security
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS ?? 10),
};
