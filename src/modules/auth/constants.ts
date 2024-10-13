import * as dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};
