import jwt, { JwtHeader } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { env } from "@/config/env.js";

const client = jwksClient({
  jwksUri: env.GOOGLE_JWKS_URI,
  cache: true,
  rateLimit: true,
});

function getKey(header: JwtHeader, callback: jwt.SigningKeyCallback) {
  if (!header.kid) {
    return callback(new Error("Missing kid in token header"));
  }

  client.getSigningKey(header.kid, (err, key) => {
    if (err || !key) {
      return callback(err || new Error("Signing key not found"));
    }

    callback(null, key.getPublicKey());
  });
}

export type GoogleIdTokenClaims = {
  sub: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
};

export function verifyGoogleIdToken(
  idToken: string,
): Promise<GoogleIdTokenClaims> {
  return new Promise((resolve, reject) => {
    jwt.verify(
      idToken,
      getKey,
      {
        algorithms: ["RS256"],
        issuer: ["https://accounts.google.com", "accounts.google.com"],
        audience: env.GOOGLE_CLIENT_ID,
      },
      (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded as GoogleIdTokenClaims);
      },
    );
  });
}
