import { Router } from "express";
import authController from "../../../controllers/v1/auth-controller.js";

const signoutRouter = Router();

signoutRouter.post("/v1/auth/logout", authController.logout);

export default signoutRouter;
