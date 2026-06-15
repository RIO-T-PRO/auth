import dotenv from "dotenv";

dotenv.config();

export class Env {
  private require(name: string): string {
    const value = process.env[name];

    if (!value) {
      throw new Error(`Missing environment variable: ${name}`);
    }

    return value;
  }

  get PORT(): number {
    return Number(process.env.PORT ?? 8080);
  }

  get NODE_ENV(): string {
    return process.env.NODE_ENV ?? "development";
  }

  get DATABASE_URL(): string {
    return this.require("DATABASE_URL");
  }

  get GOOGLE_CLIENT_ID(): string {
    return this.require("GOOGLE_CLIENT_ID");
  }

  get GOOGLE_CLIENT_SECRET(): string {
    return this.require("GOOGLE_CLIENT_SECRET");
  }

  get GOOGLE_REDIRECT_URI(): string {
    return (
      process.env.GOOGLE_REDIRECT_URI ??
      "http://localhost:8080/auth/google/callback"
    );
  }

  get GOOGLE_JWKS_URI(): string {
    return (
      process.env.GOOGLE_JWKS_URI ??
      "https://www.googleapis.com/oauth2/v3/certs"
    );
  }

  get GOOGLE_ISSUER(): string {
    return process.env.GOOGLE_ISSUER ?? "https://accounts.google.com";
  }

  get FRONTEND_URL(): string {
    return process.env.FRONTEND_URL ?? "http://localhost:5173";
  }

  get JWT_ACCESS_SECRET(): string {
    return this.require("JWT_ACCESS_SECRET");
  }

  get JWT_REFRESH_SECRET(): string {
    return this.require("JWT_REFRESH_SECRET");
  }

  get TOKEN_HASH_SECRET(): string {
    return this.require("TOKEN_HASH_SECRET");
  }

  get ACCESS_TOKEN_EXPIRES_IN() {
    return Number(process.env.ACCESS_TOKEN_EXPIRES_IN) ?? 900;
  }

  get REFRESH_TOKEN_EXPIRES_IN() {
    return Number(process.env.REFRESH_TOKEN_EXPIRES_IN) ?? 604800;
  }

  get REFRESH_TOKEN_COOKIE_DAYS(): number {
    return Number(process.env.REFRESH_TOKEN_COOKIE_DAYS ?? 7);
  }

  get BCRYPT_SALT_ROUNDS(): number {
    return Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);
  }
}

export const env = new Env();
