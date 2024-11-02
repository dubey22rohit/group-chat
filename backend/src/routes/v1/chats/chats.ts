import { Router } from "express";
import authMiddleware from "../../../middlewares/auth-middleware.js";
import chatsController from "../../../controllers/v1/chats-controller.js";

const chatsRouter = Router();

chatsRouter.post("/v1/chats/add", authMiddleware, chatsController.addNewChat);
chatsRouter.get("/v1/chats/all", authMiddleware, chatsController.getGroupChats);

export default chatsRouter;
