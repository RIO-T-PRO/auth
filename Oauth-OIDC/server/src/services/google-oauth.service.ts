import axios from "axios";
import { env } from "@/config/env.js";
import {
  GoogleIdTokenClaims,
  verifyGoogleIdToken,
} from "@/middlewares/verify-google-id-token.js";

export class GoogleOAuthService {
  authorizeUrl(state?: string): string {
    const params = new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      redirect_uri: env.GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent",
    });

    if (state) {
      params.set("state", state);
    }

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  async exchangeCodeForTokens(code: string) {
    const body = new URLSearchParams({
      code,
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      body,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    return response.data as {
      access_token: string;
      expires_in: number;
      id_token: string;
      refresh_token?: string;
      scope?: string;
      token_type: string;
    };
  }

  async verifyIdToken(idToken: string): Promise<GoogleIdTokenClaims> {
    return verifyGoogleIdToken(idToken);
  }

  async fetchUserInfo(accessToken: string) {
    const response = await axios.get(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data as {
      sub: string;
      email?: string;
      email_verified?: boolean;
      name?: string;
      picture?: string;
    };
  }
}
