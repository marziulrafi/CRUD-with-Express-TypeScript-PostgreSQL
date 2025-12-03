import dotenv from "dotenv";
import path from "path";

dotenv.config();

const config = {
  connection_string: process.env.CONNECTION,
  port: process.env.PORT,
};

export default config;