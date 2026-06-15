import { GitHubAuthController } from "@/controllers/github-Oauth.js";
import { GoogleAuthController } from "@/controllers/google-Oauth.js";
import { Router } from "express";

const router = Router();

router.get("/github", GitHubAuthController.redirectToGitHub);
router.get("/github/callback", GitHubAuthController.handleCallback);

router.get("/google", GoogleAuthController.redirectToGoogle);
router.get("/google/callback", GoogleAuthController.handleCallback);

export default router;
