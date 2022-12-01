import { Request, Response } from 'express';
import IUserService from '../entities/services/IUserService';

export default class UserController {
  private userService: IUserService;

  constructor(UserService: IUserService) {
    this.userService = UserService;
  }

  async login(req: Request, res: Response) {
    const token = await this.userService.login(req.body);

    return res.status(200).json({ token });
  }
}
