import type { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../config/db-config.js";
interface LoginPayloadType {
  name: string;
  email: string;
  oauth_id: string;
  provider: string;
  image: string;
}
class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const body: LoginPayloadType = req.body;
      let findUser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
      if (!findUser) {
        findUser = await prisma.user.create({
          data: body,
        });
      }
      let JWTPayload = {
        name: body.name,
        email: body.email,
        id: findUser.id,
      };
      const token = jwt.sign(JWTPayload, process.env.JWT_SECRET as string, {
        expiresIn: "365d",
      });
      res.status(200).json({
        message: "logged in successfully",
        user: {
          ...findUser,
          token: `Bearer ${token}`,
        },
      });
      return;
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
      return;
    }
  }
}

export default AuthController;
