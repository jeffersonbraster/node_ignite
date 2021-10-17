import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });
  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "corolla teste",
      description: "carro top",
      daily_rate: 100,
      license_plate: "ABC1234",
      fine_amount: 150,
      brand: "brand teste",
      category_id: "4b745005-d1b9-4032-84fe-7eda3630e5f2",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "corolla teste2",
      description: "carro top",
      daily_rate: 100,
      license_plate: "ABC1234678",
      fine_amount: 150,
      brand: "brand_teste1",
      category_id: "4b745005-d1b9-4032-84fe-7eda3630e5f2",
    });

    const cars = await listCarsUseCase.execute({
      brand: "brand_teste1",
    });

    expect(cars).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ brand: "brand_teste1" }),
      ])
    );
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "corolla teste2",
      description: "carro top",
      daily_rate: 100,
      license_plate: "ABC12345",
      fine_amount: 150,
      brand: "brand_teste1",
      category_id: "4b745005-d1b9-4032-84fe-7eda3630e5f2",
    });

    const cars = await listCarsUseCase.execute({
      name: "corolla teste2",
    });

    expect(cars).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "corolla teste2" }),
      ])
    );
  });
});
