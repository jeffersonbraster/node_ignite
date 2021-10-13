import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationnUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const specificationExist = await this.specificationsRepository.findByName(
      name
    );

    if (specificationExist) {
      throw new AppError("Especificação já existe.");
    }

    await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationnUseCase };
