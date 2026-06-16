import {
  clearRefreshTokenCookie,
  comparePassword,
  generateToken,
  getExpiresDate,
  hashPassword,
  hashToken,
  setRefreshTokenCookie,
  verifyToken,
} from "@/utils/index.js";
import {
  createUser,
  findUserByEmail,
  findUserById,
} from "@/database/service/user.js";
import { LoginBody, RegisterBody } from "@/schemas/auth.js";
import { Request, Response } from "express";
import { env } from "@/config/env.js";
import {
  deleteRefreshToken,
  findRefreshToken,
  upsertRefreshToken,
} from "@/database/service/refresh-token.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as RegisterBody;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = await hashPassword(password);
    const user = await createUser(name, email, hashedPassword);

    const accessToken = generateToken("access", user.id);
    const refreshToken = generateToken("refresh", user.id);
    const expiresAt = getExpiresDate(env.REFRESH_TOKEN_EXPIRES_IN);
    const hashedRefreshToken = hashToken(refreshToken);

    await upsertRefreshToken(user.id, hashedRefreshToken, expiresAt);
    setRefreshTokenCookie(res, refreshToken);

    return res.status(201).json({
      message: "User created successfully",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
      accessToken,
    });
  } catch (error) {
    console.error("Signup error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginBody;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateToken("access", user.id);
    const refreshToken = generateToken("refresh", user.id);
    const expiresAt = getExpiresDate(env.REFRESH_TOKEN_EXPIRES_IN);
    const hashedRefreshToken = hashToken(refreshToken);

    await upsertRefreshToken(user.id, hashedRefreshToken, expiresAt);
    setRefreshTokenCookie(res, refreshToken);

    return res.status(200).json({
      message: "Signed in successfully",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
      accessToken,
    });
  } catch (error) {
    console.error("Signin error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const signout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      try {
        const payload = verifyToken("refresh", refreshToken) as { id: string };
        await deleteRefreshToken(payload.id);
      } catch {
        // ignore invalid token
      }
    }

    clearRefreshTokenCookie(res);

    return res.status(200).json({
      message: "Signed out successfully",
    });
  } catch (error) {
    console.error("Signout error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const tokenFromCookie = req.cookies?.refreshToken;

    if (!tokenFromCookie) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const payload = verifyToken("refresh", tokenFromCookie) as { id: string };
    const hashedToken = hashToken(tokenFromCookie);
    const storedToken = await findRefreshToken(hashedToken);

    if (!storedToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    if (storedToken.userId !== payload.id) {
      return res.status(403).json({ message: "Token mismatch" });
    }

    if (storedToken.expiresAt.getTime() < Date.now()) {
      await deleteRefreshToken(payload.id);
      return res.status(403).json({ message: "Refresh token expired" });
    }

    const user = await findUserById(payload.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAccessToken = generateToken("access", user.id);
    const newRefreshToken = generateToken("refresh", user.id);
    const expiresAt = getExpiresDate(env.REFRESH_TOKEN_EXPIRES_IN);
    const hashedNewRefreshToken = hashToken(newRefreshToken);

    await upsertRefreshToken(user.id, hashedNewRefreshToken, expiresAt);
    setRefreshTokenCookie(res, newRefreshToken);

    return res.status(200).json({
      message: "Token refreshed successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Refresh token error", error);
    return res.status(403).json({ error: "Invalid or expired refresh token" });
  }
};

export const me = (req: Request, res: Response) => {
  const user = req.user;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.status(200).json({
    message: "success",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
};
