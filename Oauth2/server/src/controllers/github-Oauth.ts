import { env } from "@/config/env.js";
import { GitHubOAuthService } from "@/services/github-Oauth.js";
import { Request, Response } from "express";

export class GitHubAuthController {
  static redirectToGitHub(req: Request, res: Response): void {
    const url = GitHubOAuthService.getAuthorizeUrl();

    console.log("Redirecting to:", url);

    res.redirect(url);
  }

  static async handleCallback(
    req: Request,
    res: Response,
  ): Promise<Response | void> {
    const code = req.query.code as string | undefined;

    if (!code) {
      return res.status(400).json({
        error: "Authorization code is missing",
      });
    }

    try {
      const accessToken = await GitHubOAuthService.exchangeCodeForToken(code);

      const user = await GitHubOAuthService.fetchGitHubUser(accessToken);

      const emails = await GitHubOAuthService.fetchGitHubEmails(accessToken);

      const email = GitHubOAuthService.pickVerifiedEmail(emails);

      if (!email) {
        return res.status(400).json({
          error: "No verified email found on GitHub account",
        });
      }

      const userData = {
        id: user.id,
        username: user.login,
        name: user.name || "",
        avatarUrl: user.avatar_url,
        email,
      };

      return res.redirect(
        `${env.FRONTEND_URL}/success?user=${encodeURIComponent(
          JSON.stringify(userData),
        )}`,
      );
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: "Authentication failed",
      });
    }
  }
}
