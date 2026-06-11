import bcrypt from "bcryptjs";

export const generateSalt = async (rounds = 10) => {
  return await bcrypt.genSalt(rounds);
};

export const hashPassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
