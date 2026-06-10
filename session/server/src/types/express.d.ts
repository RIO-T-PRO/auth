import { Session, User } from "@/generated/prisma/client.ts";

declare global {
  namespace Express {
    interface Request {
      user: User;
      session: Session;
    }
  }
}

export {};
