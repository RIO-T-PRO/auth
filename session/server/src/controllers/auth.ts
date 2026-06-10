import { createSession, deleteSession } from "@/database/service/session.js";
import { createUser, findUserByEmail } from "@/database/service/user.js";
import { LoginBody, RegisterBody } from "@/schemas/auth.js";
import { clearSessionCookie, setSessionCookie } from "@/utils/cookie.js";
import { comparePassword, hashPassword } from "@/utils/password.js";
import { createExpirationDate } from "@/utils/session.js";
import { Request, Response } from "express";

export const register = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { username, email, password } = req.body as RegisterBody;

    const existingEmail = await findUserByEmail(email);

    if (existingEmail)
      return res.status(409).json({ error: "Email Already in use" });

    const hashedPassword = hashPassword(password);

    const user = await createUser(username, email, password);

    const session = await createSession(user.id, createExpirationDate());

    setSessionCookie(res, session.id);

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("User Registration error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body as LoginBody;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    const session = await createSession(user.id, createExpirationDate());

    setSessionCookie(res, session.id);

    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.error("User login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const sessionId = req.cookies["connect.sid"];

    if (sessionId) {
      await deleteSession(sessionId);
    }

    clearSessionCookie(res);

    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.error("Logout error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const me = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    user: req.user,
  });
};
