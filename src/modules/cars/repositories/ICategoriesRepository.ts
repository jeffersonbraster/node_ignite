import { Category } from "../entities/Category";

export interface ICreateCategoryDto {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDto): Promise<void>;
}

export { ICategoriesRepository };
