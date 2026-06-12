import express from "express";
import { me, signin, signout, signup } from "@/controllers/auth.js";
import { validate } from "@/middlewares/validate.js";
import { signInSchema, signUpSchema } from "@/schemas/auth.js";
import { authenticate } from "@/middlewares/auth.js";

const router = express.Router();

// SIGN UP
router.post("/signup", validate(signUpSchema, "body"), signup);

// SIGN IN
router.post("/signin", validate(signInSchema, "body"), signin);

// LOGOUT
router.post("/logout", signout);

// ME
router.get("/me", authenticate, me);

export default router;
