import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';

dotenv.config();

interface Config {
  port: number;
  mongodbUri: string;
  jwtSecret: Secret;
  jwtExpiresIn: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 5000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/task-management',
  jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret_key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d'
};

export default config;