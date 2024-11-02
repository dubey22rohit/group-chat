import type { NextFunction, Request, Response } from "express";
import { TokenService } from "../../services/token-service.js";
import { NotAuthorizedError } from "../../errors/not-authorized-error.js";
import { DBConnectionError } from "../../errors/db-connection-error.js";
import prisma from "../../config/db-config.js";
import { NotFoundError } from "../../errors/not-found-error.js";

class RefreshTokenController {
  public async refresh(req: Request, res: Response, next: NextFunction) {
    const { refreshToken: cookieRefreshToken } = req.cookies;

    let userData;
    try {
      userData = TokenService.verifyRefreshToken(cookieRefreshToken);
    } catch (error) {
      next(new NotAuthorizedError());
      return;
    }

    try {
      const token = TokenService.findRefreshToken(userData.id, cookieRefreshToken);
      if (!token) {
        next(new NotAuthorizedError());
        return;
      }
    } catch (error) {
      next(new DBConnectionError());
      return;
    }

    const user = await prisma.user.findUnique({ where: { id: userData.id } });
    if (!user) {
      // TODO: check if this is a security flaw
      next(new NotFoundError("user does not exist"));
      return;
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      TokenService.generateTokens({
        id: user.id,
        email: user.email,
      });

    try {
      await TokenService.updateRefreshToken(user.id, newRefreshToken);
    } catch (error) {
      next(new DBConnectionError());
      return;
    }

    res.cookie("refreshToken", newRefreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", newAccessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.status(201).json({ data: user });
  }
}

export default new RefreshTokenController();
