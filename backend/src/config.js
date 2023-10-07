import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT,
  MONGOURL: process.env.MONGOURL,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET
};