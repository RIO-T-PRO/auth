import { TokenType } from "@/types/token.js";
import { env } from "./env.js";

export const getToken = (type: TokenType) => {
  return {
    secret:
      type === "access" ? env.ACCESS_TOKEN_SECRET : env.REFRESH_TOKEN_SECRET,
    expiresIn:
      type === "access"
        ? Number(env.ACCESS_TOKEN_EXPIRES_IN)
        : Number(env.REFRESH_TOKEN_EXPIRES_IN),
  };
};
