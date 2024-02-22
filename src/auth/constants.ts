import { config } from "dotenv";
config();

export const jwtConstants = {
  secret: process.env.JWT_TOKEN,
  authTokenExpiresIn: process.env.JWT_AUTH_TOKEN_EXPIRES_IN,
  refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
};
