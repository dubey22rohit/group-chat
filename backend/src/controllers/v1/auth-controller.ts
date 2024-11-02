import type { NextFunction, Request, Response } from "express";
import prisma from "../../config/db-config.js";
import { BadRequestError } from "../../errors/bad-request-error.js";
import { PasswordService } from "../../services/hash-service.js";
import { DBConnectionError } from "../../errors/db-connection-error.js";
import { TokenService } from "../../services/token-service.js";
import { NotAuthorizedError } from "../../errors/not-authorized-error.js";

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { username, email, password } = req.body;
    try {
      let existingUser = await prisma.user.findUnique({
        where: {
          username,
          email,
        },
      });
      if (existingUser) {
        throw new BadRequestError("user already exists", 409);
      }
    } catch (error) {
      next(error);
      return;
    }

    let user;
    try {
      const passwordHash = await PasswordService.toHash(password);
      user = await prisma.user.create({
        data: {
          email,
          username,
          passwordHash,
        },
      });
    } catch (error) {
      next(new DBConnectionError());
      return;
    }

    const { accessToken, refreshToken } = TokenService.generateTokens({
      id: user.id,
      email: user.email,
    });

    await TokenService.storeRefreshToken(user.id, refreshToken);

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true, //ClientJS won't be able to read it, only server will be able to read it
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true, //ClientJS won't be able to read it, only server will be able to read it
    });

    res.status(201).json({ data: accessToken, message: "user created" });
    return;
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      next(new NotAuthorizedError());
      return;
    }

    const passwordMatch = PasswordService.compare(password, existingUser.passwordHash);
    if (!passwordMatch) {
      next(new NotAuthorizedError());
      return;
    }

    const { accessToken, refreshToken } = TokenService.generateTokens({
      id: existingUser.id,
      email: existingUser.email,
    });

    await TokenService.updateRefreshToken(existingUser.id, refreshToken);

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true, //ClientJS won't be able to read it, only server will be able to read it
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true, //ClientJS won't be able to read it, only server will be able to read it
    });

    res.status(200).json({ data: accessToken, message: "logged in successfully" });
  }

  public async logout(req: Request, res: Response) {
    const { refreshToken } = req.cookies;

    await TokenService.removeToken(refreshToken);

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    res.json({ data: null, message: "log out successful" });
    return;
  }
}

export default new AuthController();
