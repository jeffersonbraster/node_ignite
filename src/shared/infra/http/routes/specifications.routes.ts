import { CreateSpecificationsController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";

const specificationsRoutes = Router();

const createSpecificationsController = new CreateSpecificationsController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", createSpecificationsController.handle);

export { specificationsRoutes };
