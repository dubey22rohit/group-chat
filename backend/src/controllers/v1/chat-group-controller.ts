import { NextFunction, Request, Response } from "express";
import prisma from "../../config/db-config.js";
import { CustomError } from "../../errors/custom-error.js";
import { NotFoundError } from "../../errors/not-found-error.js";
import { GenericError } from "../../errors/generic-error.js";
class ChatGroupController {
  /**
   * Returns a list of chat groups for the current user
   * @param req Express request object
   * @param res Express response object
   * @param next Express next function
   */
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;

      const groups = await prisma.chatGroup.findMany({
        where: {
          user_id: user.id,
        },
        orderBy: {
          created_at: "desc",
        },
      });
      res.status(200).json({ data: groups });
      return;
    } catch (error) {
      next(new GenericError());
      return;
    }
  }

  /**
   * Retrieves a single chat group by ID
   * @param req Express request object
   * @param res Express response object
   * @param next Express next function
   */
  public async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const groupId = parseInt(id, 10);
      if (id) {
        const group = await prisma.chatGroup.findUnique({
          where: {
            id: groupId,
          },
        });
        res.status(200).json({ data: group });
      } else {
        next(new NotFoundError("unable to find chat group"));
        return;
      }
    } catch (error) {
      next(new GenericError());
      return;
    }
  }

  /**
   * Creates a new chat group
   * @param req Express request object
   * @param res Express response object
   * @param next Express next function
   */
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, passcode } = req.body;
      const user = req.user;

      await prisma.chatGroup.create({
        data: {
          title,
          passcode,
          user_id: user.id,
        },
      });

      res.status(201).json({ message: "chat group created" });
      return;
    } catch (error) {
      next(new GenericError());
      return;
    }
  }

  public async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const groupId = parseInt(id, 10);
      if (isNaN(groupId)) {
        next(new NotFoundError("invalid chat group id"));
        return;
      }
      await prisma.chatGroup.delete({
        where: {
          id: groupId,
        },
      });
      res.status(204).json({ message: "chat deleted" });
      return;
    } catch (error) {
      next(new GenericError());
      return;
    }
  }
}

export default new ChatGroupController();
