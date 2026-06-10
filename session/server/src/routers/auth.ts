import { Router } from "express";
import { register, login, logout, me } from "@/controllers/auth.js";
import { authMiddleware } from "@/middlewares/auth.js";
import { validate } from "@/middlewares/validate.js";
import { LoginSchema, RegisterSchema } from "@/schemas/auth.js";

const router = Router();

router.post("/register", validate(RegisterSchema, "body"), register);
router.post("/login", validate(LoginSchema, "body"), login);
router.post("/logout", logout);

router.get("/me", authMiddleware, me);

export default router;
