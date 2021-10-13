import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      drive_license: "00123",
      email: "jeje@gmail.com",
      password: "1234",
      name: "jeje test",
    };

    await createUserUseCase.execute(user);

    const authenticated = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(authenticated).toHaveProperty("token");
  });

  it("should not be able to authenticate an noneexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "test@gmail.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        drive_license: "001234",
        email: "jeje@gmail.com",
        password: "12345",
        name: "jeje test",
      };
      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "123",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
