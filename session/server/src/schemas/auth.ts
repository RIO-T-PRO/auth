import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const RegisterSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8),
});
export const SessionSchema = z.object({
  sessionId: z.string().min(1),
});

export type RegisterBody = z.infer<typeof RegisterSchema>;

export type LoginBody = z.infer<typeof LoginSchema>;

export type SessionBody = z.infer<typeof SessionSchema>;
