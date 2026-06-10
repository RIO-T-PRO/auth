import { Response } from "express";

const EXPIRES_IN = Number(process.env.SESSION_EXPIRES);

export const setSessionCookie = (res: Response, sessionId: string): void => {
  res.cookie("connect.sid", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: EXPIRES_IN * 60 * 60 * 24 * 1000,
  });
};

export const clearSessionCookie = (res: Response): void => {
  res.clearCookie("connect.sid");
};
