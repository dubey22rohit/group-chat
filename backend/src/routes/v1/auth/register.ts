import { Router } from "express";
import { SignUpValidationConstraints } from "../../../constants/request-constants.js";
import { validateRequest } from "../../../middlewares/validate-request.js";
import authController from "../../../controllers/v1/auth-controller.js";
import { errorHandler } from "../../../middlewares/error-handler.js";

const registerRouter = Router();

registerRouter.post(
  "/v1/auth/register",
  SignUpValidationConstraints,
  validateRequest,
  authController.register,
);

export default registerRouter;
