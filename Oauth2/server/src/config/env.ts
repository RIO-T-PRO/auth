import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 8080,

  // GitHub OAuth
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID as string,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET as string,

  // Google OAuth
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,

  // Redirect URIs
  GITHUB_REDIRECT_URI:
    process.env.GITHUB_REDIRECT_URI ||
    "http://localhost:8080/auth/github/callback",
  GOOGLE_REDIRECT_URI:
    process.env.GOOGLE_REDIRECT_URI ||
    "http://localhost:8080/auth/google/callback",

  // Frontend URL
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
};
