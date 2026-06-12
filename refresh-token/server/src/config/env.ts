import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().positive(),

  DATABASE_URL: z.string().min(1),

  ACCESS_TOKEN_SECRET: z.string().min(1),
  ACCESS_TOKEN_EXPIRES_IN: z.coerce.number().positive(),

  REFRESH_TOKEN_SECRET: z.string().min(1),
  REFRESH_TOKEN_EXPIRES_IN: z.coerce.number().positive(),

  BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(10),
});

export const env = envSchema.parse(process.env);
