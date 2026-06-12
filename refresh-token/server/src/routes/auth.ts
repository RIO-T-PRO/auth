import { refreshToken, signin, signout, signup } from "@/controllers/auth.js";

import { validate } from "@/middlewares/validate.js";
import { authMiddleware } from "@/middlewares/auth.js";
import { LoginBodySchema, RegisterBodySchema } from "@/schemas/auth.js";

import express from "express";

const router = express.Router();

router.post("/signup", validate(RegisterBodySchema, "body"), signup);

router.post("/signin", validate(LoginBodySchema, "body"), signin);

router.post("/refresh", refreshToken);

router.post("/signout", authMiddleware, signout);

export default router;
