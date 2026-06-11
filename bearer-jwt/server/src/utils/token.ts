import jwt from "jsonwebtoken";

export interface AccessTokenPayload {
  userId: string;
  email: string;
}

export const generateToken = (payload: { userId: string; email: string }) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string): AccessTokenPayload => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  if (typeof decoded === "string") {
    throw new Error("Invalid token");
  }
  return decoded as AccessTokenPayload;
};
