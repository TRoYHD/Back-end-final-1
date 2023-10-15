import bcrypt from 'bcrypt';
import envConfig from '../config/env.config';

const SALT = envConfig.salt;

const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, SALT);
};

const compare = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};

export { hashPassword, compare };
