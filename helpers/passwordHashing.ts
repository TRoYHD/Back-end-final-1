import bcrypt from "bcrypt";
import { User } from "../models";

export function hashPassword(user: User) {
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;
  return user;
}

export function checkPassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
