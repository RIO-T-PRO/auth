import { deleteSession, findSessionById } from "@/database/service/session.js";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sessionId = req.cookies["connect.sid"];

    if (!sessionId) return res.status(401).json({ error: "Unauthorized" });

    const session = await findSessionById(sessionId);

    if (!session) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    if (session.expiresAt.getTime() < Date.now()) {
      await deleteSession(session.id);

      return res.status(401).json({
        message: "Session expired",
      });
    }

    req.user = session.user;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
