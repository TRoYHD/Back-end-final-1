import { config } from 'dotenv';

config();

export default {
  port: process.env.PORT,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbPassword: process.env.DB_PASSWORD,
  cloudinaryAPIKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryAPISecret: process.env.CLOUDINARY_API_SECRET,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  salt: process.env.SALT ? parseInt(process.env.SALT) : 10,
  secret: process.env.SECRET ?? 'test'
};
