import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/authenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";
import { Router } from "express";

const authenticateRouter = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRouter.post("/session", authenticateUserController.handle);

authenticateRouter.post("/refresh-token", refreshTokenController.handle);

export { authenticateRouter };
