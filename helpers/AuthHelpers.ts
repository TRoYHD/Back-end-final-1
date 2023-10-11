import config from "../config/environment";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AuthError } from "../errors";

class AuthHelpers {
  static isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1] || "";
    try {
      jwt.verify(token, config.jwt.secretKey);
      next();
    } catch (error) {
      const exception = new AuthError(
        "Unauthenticated, Please sign in first",
        401
      ) as Error;
      next(exception);
    }
  }
  static async verifyToken(token: string): Promise<{ id: number }> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
        if (error) {
          reject(error);
        } else {
          const decodedJWT = decoded as { id: number };
          resolve(decodedJWT);
        }
      });
    });
  }

  static async createToken(id: number) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { id },
        config.jwt.secretKey,
        {
          algorithm: "HS256",
          expiresIn: "1h",
        },
        (error, token) => {
          error ? reject(error) : resolve(token);
        }
      );
    });
  }
}

export default AuthHelpers;
