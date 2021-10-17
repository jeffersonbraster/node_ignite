import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUserCase";

class CreateCarSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_id } = request.body;

    const createCarSpeficicationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const cars = await createCarSpeficicationUseCase.execute({
      car_id: id,
      specifications_id,
    });

    return response.status(201).json(cars);
  }
}

export { CreateCarSpecificationsController };
