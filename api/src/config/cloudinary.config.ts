import { v2 as cloudinary } from 'cloudinary';
import envConfig from './env.config';

cloudinary.config({
  cloud_name: envConfig.cloudinaryCloudName,
  api_key: envConfig.cloudinaryAPIKey,
  api_secret: envConfig.cloudinaryAPISecret,
  secure: true,
});

export default cloudinary;