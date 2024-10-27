import { Router } from "express";
import refreshTokenController from "../../../controllers/v1/refresh-token-controller.js";

const refreshTokenRouter = Router();

refreshTokenRouter.get("/v1/token/refresh", refreshTokenController.refresh);

export default refreshTokenRouter;
