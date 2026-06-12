import { z } from "zod";

export const RegisterBodySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),

  email: z.string().trim().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(255),
});

export const LoginBodySchema = z.object({
  email: z.string().trim().email("Invalid email address"),

  password: z.string().min(1, "Password is required"),
});

export const LogoutBodySchema = z.object({});

export type RegisterBody = z.infer<typeof RegisterBodySchema>;

export type LoginBody = z.infer<typeof LoginBodySchema>;

export type LogoutBody = z.infer<typeof LogoutBodySchema>;
