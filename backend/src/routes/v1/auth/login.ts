import { Router } from "express";
import { SignInValidationConstraints } from "../../../constants/request-constants.js";
import authController from "../../../controllers/v1/auth-controller.js";
import { validateRequest } from "../../../middlewares/validate-request.js";

const loginRouter = Router();

loginRouter.post(
  "/v1/auth/login",
  SignInValidationConstraints,
  validateRequest,
  authController.login,
);

export default loginRouter;
