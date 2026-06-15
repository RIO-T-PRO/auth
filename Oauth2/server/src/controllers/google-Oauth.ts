import { env } from "@/config/env.js";
import { GoogleOAuthService } from "@/services/google-Oauth.js";
import { Request, Response } from "express";

export class GoogleAuthController {
  static redirectToGoogle(_req: Request, res: Response): void {
    const url = GoogleOAuthService.getAuthorizeUrl();
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
      const accessToken = await GoogleOAuthService.exchangeCodeForToken(code);
      const userData = await GoogleOAuthService.fetchUser(accessToken);

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
