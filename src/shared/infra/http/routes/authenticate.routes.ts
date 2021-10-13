import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/authenticateUserController";
import { Router } from "express";

const authenticateRouter = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRouter.post("/session", authenticateUserController.handle);

export { authenticateRouter };
