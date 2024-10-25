import { Router } from "express";
import AuthController from "../controllers/v1/auth-controller.js";

const router = Router();

// login route
router.post("/v1/auth", AuthController.login);

export default router;
