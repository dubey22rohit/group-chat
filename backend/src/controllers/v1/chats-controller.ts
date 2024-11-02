import { Request, Response, NextFunction } from "express";
import prisma from "../../config/db-config.js";

class ChatsController {
  public async getGroupChats(req: Request, res: Response, next: NextFunction) {
    try {
      const { groupId } = req.query;
      const gid = parseInt(groupId as string, 10);
      const chats = await prisma.chats.findMany({
        where: {
          group_id: gid,
        },
      });
      res.status(200).json({ data: chats, message: "chats retrieved successfully" });
      return;
    } catch (error) {
      next(error);
      return;
    }
  }

  public async addNewChat(req: Request, res: Response, next: NextFunction) {
    try {
      const { groupId, message, name } = req.body;
      const data = {
        group_id: parseInt(groupId, 10),
        message,
        name,
        file: req.body?.file || "",
      };
      const addChat = await prisma.chats.create({
        data,
      });
      res.status(201).json({ data: addChat, message: "chat created successfully" });
    } catch (error) {
      next(error);
      return;
    }
  }
}

export default new ChatsController();
