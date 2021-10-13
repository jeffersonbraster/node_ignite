import { getRepository, Repository } from "typeorm";
import { Specifications } from "@modules/cars/infra/typeorm/entities/Specification";
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from "../../../repositories/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specifications>;

  constructor() {
    this.repository = getRepository(Specifications);
  }

  async findByName(name: string): Promise<Specifications> {
    const specification = this.repository.findOne({ name });

    return specification;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specifications = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specifications);
  }
}

export { SpecificationsRepository };
