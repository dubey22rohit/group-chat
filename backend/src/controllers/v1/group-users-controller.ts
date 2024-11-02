import { NextFunction, Request, Response } from "express";
import prisma from "../../config/db-config.js";

interface GroupUserType {
  name: string;
  group_id: number;
}

class GroupUsersController {
  public async getGroupUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { group_id } = req.query;
      const groupId = parseInt(group_id as string, 10);
      const users = await prisma.groupUsers.findMany({
        where: {
          group_id: groupId,
        },
      });
      res.status(200).json({ data: users, message: "users fetched successfully" });
      return;
    } catch (error) {
      next(error);
      return;
    }
  }

  public async addGroupUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const body: GroupUserType = req.body;
      const user = await prisma.groupUsers.create({
        data: body,
      });
      res.status(201).json({ data: user, message: "user added successfully" });
    } catch (error) {
      next(error);
      return;
    }
  }
}

export default new GroupUsersController();
