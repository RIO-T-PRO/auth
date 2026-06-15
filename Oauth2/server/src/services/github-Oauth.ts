import axios from "axios";

import { env } from "@/config/env.js";
import { GitHubEmail, GitHubUser } from "@/types/github.js";
import { OAuthUserData } from "@/types/oauth-user-data.js";

export class GitHubOAuthService {
  static getAuthorizeUrl(): string {
    const params = new URLSearchParams({
      client_id: env.GITHUB_CLIENT_ID,
      scope: "user:email",
    });

    return `https://github.com/login/oauth/authorize?${params.toString()}`;
  }

  static async exchangeCodeForToken(code: string): Promise<string> {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    const accessToken = response.data.access_token;

    if (!accessToken) {
      throw new Error("Failed to retrieve access token");
    }

    return accessToken;
  }

  static async fetchGitHubUser(accessToken: string): Promise<GitHubUser> {
    const response = await axios.get<GitHubUser>(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    return response.data;
  }

  static async fetchGitHubEmails(accessToken: string): Promise<GitHubEmail[]> {
    const response = await axios.get<GitHubEmail[]>(
      "https://api.github.com/user/emails",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    return response.data;
  }

  static pickVerifiedEmail(emails: GitHubEmail[]): string | null {
    const primaryEmail = emails.find(
      (email) => email.primary && email.verified,
    );
    const fallbackEmail = emails.find((email) => email.verified);

    return primaryEmail?.email || fallbackEmail?.email || null;
  }

  static async fetchUser(accessToken: string): Promise<OAuthUserData> {
    const user = await this.fetchGitHubUser(accessToken);
    const emails = await this.fetchGitHubEmails(accessToken);
    const email = this.pickVerifiedEmail(emails);

    if (!email) {
      throw new Error("No verified email found on GitHub account");
    }

    return {
      provider: "github",
      id: user.id,
      username: user.login,
      name: user.name || "",
      avatarUrl: user.avatar_url,
      email,
    };
  }
}
