import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import IUserService from '../entities/services/IUserService';

dotenv.config();

const secret = process.env.JWT_SECRET;

export default class UserController {
  private userService: IUserService;

  constructor(UserService: IUserService) {
    this.userService = UserService;
  }

  async login(req: Request, res: Response) {
    const token = await this.userService.login(req.body);

    return res.status(200).json({ token });
  }

  static async loginValidate(req: Request, res: Response) {
    const { authorization } = req.headers;

    const payload = jwt.verify(authorization as string, secret as string);

    const { role } = payload as jwt.JwtPayload;

    return res.status(200).json({ role });
  }
}
