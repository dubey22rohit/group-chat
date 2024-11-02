import { Router } from "express";
import authMiddleware from "../../../middlewares/auth-middleware.js";
import groupUsersController from "../../../controllers/v1/group-users-controller.js";

const groupUsersRouter = Router();

groupUsersRouter.get("/v1/chats/users/all", authMiddleware, groupUsersController.getGroupUsers);

groupUsersRouter.post("/v1/chats/users/add", authMiddleware, groupUsersController.addGroupUsers);

export default groupUsersRouter;
