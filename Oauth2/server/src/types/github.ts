export type GitHubEmail = {
  email: string;
  primary: boolean;
  verified: boolean;
};

export type GitHubUser = {
  login: string;
  name: string | null;
  id: number;
  avatar_url: string;
};
