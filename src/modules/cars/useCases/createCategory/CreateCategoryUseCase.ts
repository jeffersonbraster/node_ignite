import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

type IRequest = {
  name: string;
  description: string;
};

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryExist = await this.categoriesRepository.findByName(name);

    if (categoryExist) {
      throw new AppError("Categoria já existe");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
