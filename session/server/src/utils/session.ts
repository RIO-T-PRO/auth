const EXPIRES_IN = Number(process.env.SESSION_EXPIRES);

export const createExpirationDate = (days = EXPIRES_IN): Date => {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
};
