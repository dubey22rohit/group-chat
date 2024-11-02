import { Router } from "express";
import authMiddleware from "../../../middlewares/auth-middleware.js";
import chatGroupController from "../../../controllers/v1/chat-group-controller.js";

const chatGroupRouter = Router();

chatGroupRouter.get("/v1/chats/groups/all", authMiddleware, chatGroupController.getAll);
chatGroupRouter.get("/v1/chats/group/:id", authMiddleware, chatGroupController.getOne);

chatGroupRouter.post("/v1/chats/create", authMiddleware, chatGroupController.create);

chatGroupRouter.delete("/v1/chats/remove/:id", authMiddleware, chatGroupController.remove);

export default chatGroupRouter;
