import { Specifications } from "@modules/cars/infra/typeorm/entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationInMemory implements ISpecificationsRepository {
  specifications: Specifications[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specifications> {
    const specification = new Specifications();

    Object.assign(specification, {
      description,
      name,
    });
    this.specifications.push(specification);

    return specification;
  }
  async findByName(name: string): Promise<Specifications> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }
  async findByIds(ids: string[]): Promise<Specifications[]> {
    const allSpecifications = this.specifications.filter((specitication) =>
      ids.includes(specitication.id)
    );

    return allSpecifications;
  }
}

export { SpecificationInMemory };
