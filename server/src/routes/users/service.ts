import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { tokenService } from '../../services';
import { createError } from '../../utils';
import { LoginUserBody } from './controller';
import { dbContext } from '../../db/dbContext';

export interface TokenData {
  accessToken: string;
}

export interface UserData extends Omit<User, 'password'> {
  tokenData: TokenData;
}

class UserService {
  private readonly _saltRounds = 12;

  private prisma = dbContext.getPrisma();

  async login(data: LoginUserBody): Promise<UserData> {
    const { email, password } = data;

    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new createError.NotFound({
        data: { msg: 'Account not found' },
      });
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordEqual) {
      throw new createError.UnprocessableEntity({
        data: { msg: 'Wrong password!' },
      });
    }

    const tokenData = tokenService.generateTokens({
      ...user,
    });

    await tokenService.saveToken(user.id, tokenData.accessToken);

    return {
      ...user,
      tokenData,
    };
  }

  async registration(
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User | undefined> {
    const { email, password } = data;
    try {
      const result = this.prisma.$transaction(async (tx) => {
        const candidate = await tx.user.findFirst({ where: { email } });

        if (candidate) {
          throw new createError.UnprocessableEntity({
            data: { msg: `This email: ${email} is already being used.` },
          });
        }

        const hashPassword = await bcrypt.hash(password, this._saltRounds);

        const user = { ...data, password: hashPassword };

        const newUser = await tx.user.create({ data: user });

        return newUser;
      });

      return result;
    } catch (e) {
      throw e;
    }
  }
}

export default new UserService();
