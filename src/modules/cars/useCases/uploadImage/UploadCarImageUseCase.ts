import { inject, injectable } from "tsyringe";
import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImageRepository: ICarsImageRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (imagem) => {
      await this.carsImageRepository.create(car_id, imagem);
    });
  }
}

export { UploadCarImageUseCase };
