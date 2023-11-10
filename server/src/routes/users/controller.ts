/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { ResponseLocals } from '../../interfaces';
import { tokenService } from '../../services';
import userService from './service';

export interface LoginUserBody {
  email: string;
  password: string;
}

interface CreateUserBody {
  email: string;
  password: string;
  name: string;
}

class UsersController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async login(req: Request<any, any, LoginUserBody>, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await userService.login({ email, password });

      res.json(result);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async registration(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req: Request<any, any, CreateUserBody>,
    res: Response<unknown, ResponseLocals.AuthenticatedUser>,
  ) {
    const { email, password, name } = req.body;
    const result = await userService.registration({ email, password, name });

    res.json(result);
  }

  async logout(req: Request, res: Response) {
    try {
      const { accessToken } = req.cookies;
      if (accessToken) {
        await tokenService.removeToken(accessToken);
      }
      res.send();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export default new UsersController();
