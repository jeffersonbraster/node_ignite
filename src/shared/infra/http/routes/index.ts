import { Router } from "express";
import { authenticateRouter } from "./authenticate.routes";
import { categoriesRouter } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRouter } from "./users.routes";

import { carsRouter } from "./cars.routes";

const router = Router();

router.use("/categories", categoriesRouter);

router.use("/specifications", specificationsRoutes);

router.use("/users", usersRouter);

router.use("/cars", carsRouter);

router.use(authenticateRouter);

export { router };
