import { GitHubAuthController } from "@/controllers/github-Oauth.js";
import { Router } from "express";

const router = Router();

router.get("/github", GitHubAuthController.redirectToGitHub);
router.get("/github/callback", GitHubAuthController.handleCallback);

export default router;
