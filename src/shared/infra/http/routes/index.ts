import { Router } from "express";
import { authenticateRouter } from "./authenticate.routes";
import { categoriesRouter } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRouter } from "./users.routes";

import { carsRouter } from "./cars.routes";
import { rentalRouter } from "./rental.routes";
import { passwordRoutes } from "./password.routes";

const router = Router();

router.use("/categories", categoriesRouter);

router.use("/specifications", specificationsRoutes);

router.use("/users", usersRouter);

router.use("/cars", carsRouter);

router.use("/rentals", rentalRouter);

router.use("/password", passwordRoutes);

router.use(authenticateRouter);

export { router };
