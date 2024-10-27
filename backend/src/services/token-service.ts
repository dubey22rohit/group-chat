import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../config/db-config.js";

export interface TokenPayload extends JwtPayload {
  id: number;
  email: string;
}

export class TokenService {
  static generateTokens(payload: TokenPayload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: "6m",
    });

    return { accessToken, refreshToken };
  }

  static async storeRefreshToken(user_id: number, token: string) {
    try {
      await prisma.refresh.create({
        data: {
          token,
          user_id,
        },
      });
    } catch (error) {
      // TODO: handle
    }
  }

  static verifyAccessToken(token: string) {
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
  }

  static verifyRefreshToken(token: string) {
    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET) as TokenPayload;
  }

  static async findRefreshToken(user_id: number, refreshToken: string) {
    return await prisma.refresh.findFirst({ where: { user_id, token: refreshToken } });
  }

  static async updateRefreshToken(user_id: number, refreshToken: string) {
    return await prisma.refresh.updateMany({ where: { user_id }, data: { token: refreshToken } });
  }

  static async removeToken(refreshToken: string) {
    return await prisma.refresh.deleteMany({ where: { token: refreshToken } });
  }
}
