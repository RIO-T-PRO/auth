import { NextFunction, Request, Response } from "express";
import { TokensService } from "@/services/tokens.service.js";

export function verifyAccessToken(tokensService: TokensService) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.slice(7);

    try {
      const payload = tokensService.verifyAccessToken(token);
      (req as any).auth = payload;
      return next();
    } catch {
      return res.status(401).json({ error: "Invalid or expired access token" });
    }
  };
}
