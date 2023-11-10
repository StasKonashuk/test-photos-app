import jwt from 'jsonwebtoken';
import { User, UserToken } from '@prisma/client';
import { jwtTimestamps } from '../constants';
import { dbContext } from '../db/dbContext';

type TokenData = Omit<User, 'password'>;

class TokenService {
  private readonly _jwtAccessSecret = process.env.JWT_ACCESS_SECRET_TOKEN;

  private prisma = dbContext.getPrisma();

  generateTokens(payload: Omit<User, 'password'>): {
    accessToken: string;
  } {
    try {
      const accessToken = jwt.sign(payload, this._jwtAccessSecret as jwt.Secret, {
        expiresIn: jwtTimestamps.accessExpiresIn,
      });

      return { accessToken };
    } catch (e) {
      throw e;
    }
  }

  async saveToken(userId: string, accessToken: string): Promise<UserToken | string> {
    try {
      const tokenExists = await this.prisma.userToken.findFirst({ where: { userId } });

      if (tokenExists) {
        return await this.prisma.userToken.update({
          where: { userId },
          data: {
            accessToken,
          },
        });
      }
      const token = await this.prisma.userToken.create({ data: { userId, accessToken } });
      return token;
    } catch (e) {
      throw e;
    }
  }

  async removeToken(accessToken: string): Promise<void> {
    try {
      await this.prisma.userToken.deleteMany({ where: { accessToken } });
    } catch (e) {
      throw e;
    }
  }

  async findToken(accessToken: string): Promise<UserToken | null> {
    try {
      return await this.prisma.userToken.findFirst({ where: { accessToken } });
    } catch (e) {
      throw e;
    }
  }

  validateAccessToken(accessToken: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return <TokenData>jwt.verify(accessToken, this._jwtAccessSecret as jwt.Secret);
    } catch (e) {
      return null;
    }
  }

  getUserId(token: string) {
    try {
      const data = jwt.decode(token);
      const { id } = data as { id: string };

      return id;
    } catch (e) {
      throw e;
    }
  }
}
export const tokenService = new TokenService();
