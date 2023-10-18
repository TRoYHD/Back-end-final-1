import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: 'mysql';
}

const databaseConfig: Record<string, DatabaseConfig> = {
  development: {
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    host: process.env.DB_HOST || '',
    dialect: 'mysql',
  },
  test: {
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    host: process.env.DB_HOST || '',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    host: process.env.DB_HOST || '',
    dialect: 'mysql',
  },
};

export default databaseConfig;
