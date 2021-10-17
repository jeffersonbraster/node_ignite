import { inject, injectable } from "tsyringe";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";
import { sign, verify } from "jsonwebtoken";
import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const {
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    const { sub, email } = verify(token, secret_refresh_token) as IPayload;

    const user_id = sub;

    const userToken =
      await this.userTokenRepository.findByUserIdAndRefreshToken(
        user_id as string,
        token
      );

    if (!userToken) {
      throw new AppError("Refresh token does not exists.");
    }

    await this.userTokenRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: sub,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days
    );

    await this.userTokenRepository.create({
      user_id,
      refresh_token,
      expire_date: refresh_token_expires_date,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
