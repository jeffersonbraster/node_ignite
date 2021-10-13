import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authReader = request.headers.authorization;

  if (!authReader) {
    throw new AppError("Token vazio.", 401);
  }

  const [, token] = authReader.split(" ");

  try {
    const { sub: user_id } = verify(token, "batatinhafrita123") as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User não existe.", 401);
    }

    request.user = {
      id: user.id,
    };

    next();
  } catch {
    throw new AppError("Token invalido.", 401);
  }
}
