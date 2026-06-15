type provider = "github" | "google";

export type OAuthUserData = {
  provider: provider;
  id: number | string;
  username: string;
  name: string;
  avatarUrl: string;
  email: string;
};
