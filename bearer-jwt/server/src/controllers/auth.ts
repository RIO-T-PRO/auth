import { createUser, findUserByEmail } from "@/database/service/user.js";
import { SignInBody, SignUpBody } from "@/schemas/auth.js";
import {
  generateSalt,
  hashPassword,
  comparePassword,
} from "@/utils/password.js";
import { generateToken } from "@/utils/token.js";
import { Request, Response } from "express";

export const signup = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { name, email, password } = req.body as SignUpBody;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: "Email already in use",
      });
    }

    const salt = await generateSalt(10);
    const hashedPassword = await hashPassword(password, salt);

    const newUser = await createUser(name, email, hashedPassword);

    const accessToken = generateToken({
      userId: newUser.id,
      email: newUser.email,
    });

    return res.status(201).json({
      message: "User created successfully",
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Signup error", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const signin = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { email, password } = req.body as SignInBody;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const accessToken = generateToken({
      userId: user.id,
      email: user.email,
    });

    return res.status(200).json({
      message: "Signed in successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Signin error", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const signout = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    return res.status(200).json({
      message: "Signed out successfully",
    });
  } catch (error) {
    console.error("Signout error", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const me = async (req: Request, res: Response): Promise<Response> => {
  const user = req.user;
  return res.status(200).json({
    status: "success",
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
};
