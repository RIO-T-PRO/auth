import axios from "axios";

import { env } from "@/config/env.js";
import { OAuthUserData } from "@/types/oauth-user-data.js";

type GoogleUser = {
  sub: string;
  email: string;
  email_verified: boolean;
  name?: string;
  picture?: string;
};

export class GoogleOAuthService {
  static getAuthorizeUrl(): string {
    const params = new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      redirect_uri: env.GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent",
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  static async exchangeCodeForToken(code: string): Promise<string> {
    const params = new URLSearchParams({
      code,
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const accessToken = response.data.access_token;

    if (!accessToken) {
      throw new Error("Failed to retrieve access token");
    }

    return accessToken;
  }

  static async fetchGoogleUser(accessToken: string): Promise<GoogleUser> {
    const response = await axios.get<GoogleUser>(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  }

  static async fetchUser(accessToken: string): Promise<OAuthUserData> {
    const user = await this.fetchGoogleUser(accessToken);

    if (!user.email_verified || !user.email) {
      throw new Error("No verified email found on Google account");
    }

    return {
      provider: "google",
      id: user.sub,
      username: user.email.split("@")[0],
      name: user.name || "",
      avatarUrl: user.picture || "",
      email: user.email,
    };
  }
}
