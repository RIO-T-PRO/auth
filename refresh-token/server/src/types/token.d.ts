export interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export type TokenType = "access" | "refresh";
