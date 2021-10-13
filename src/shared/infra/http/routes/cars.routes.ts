import { Router } from "express";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

const carsRouter = Router();

let createCarController = new CreateCarController();

carsRouter.post("/", createCarController.handle);

export { carsRouter };
