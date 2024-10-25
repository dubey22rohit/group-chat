import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader === null || authHeader === undefined) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const authToken = authHeader.split(" ")[1];
  jwt.verify(authToken, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "unauthorized" });
    } else {
      req.user = user as AuthUser;
      next();
    }
  });
};

export default authMiddleware;
