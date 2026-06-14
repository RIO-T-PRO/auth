import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 8080,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID as string,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET as string,
  GITHUB_REDIRECT_URI:
    process.env.GITHUB_REDIRECT_URI ||
    "http://localhost:8080/api/auth/github/callback",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
};
