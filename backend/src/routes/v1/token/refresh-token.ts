import { Router } from "express";
import refreshTokenController from "../../../controllers/v1/refresh-token-controller.js";
import authController from "../../../controllers/v1/auth-controller.js";
import authMiddleware from "../../../middlewares/auth-middleware.js";

const refreshTokenRouter = Router();

refreshTokenRouter.get("/v1/token/refresh", authMiddleware, refreshTokenController.refresh);

export default refreshTokenRouter;
