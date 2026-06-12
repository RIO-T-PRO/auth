import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/token.js";
import { findUserById } from "@/database/service/user.js";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "accessToken missing",
      });
    }

    const accessToken = authHeader.split(" ")[1];

    const decoded = verifyToken(accessToken, "access") as {
      userId: string;
    };

    if (!decoded?.userId) {
      return res.status(401).json({
        message: "Invalid accessToken",
      });
    }

    const user = await findUserById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;

    return next();
  } catch (error) {
    console.error("Unauthorized", error);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
