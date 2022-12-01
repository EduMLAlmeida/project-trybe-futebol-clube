import * as jwt from 'jsonwebtoken';
import bcrypt = require('bcryptjs');
import * as dotenv from 'dotenv';
import UnauthorizedError from '../errors/unauthorized-error';
import IUserService from '../entities/services/IUserService';
import UserModel from '../database/models/UserModel';
import ILogin from '../entities/ILogin';

dotenv.config();

const secret = process.env.JWT_SECRET;

export default class UserService implements IUserService {
  constructor(private userModel = UserModel) {
    this.userModel = userModel;
  }

  static validatePassword(loginPassword: string, userPassword: string) {
    const checkPassword = bcrypt.compareSync(loginPassword, userPassword);

    return checkPassword;
  }

  async login(login: ILogin): Promise<string> {
    const user = await this.userModel.findOne({ where: { email: login.email } });

    if (!user || !UserService.validatePassword(login.password, user.dataValues.password)) {
      throw new UnauthorizedError('Incorrect email or password');
    }

    const { id, username, role, email } = user.dataValues;

    const payload = { id, username, role, email };

    const token = jwt.sign(payload, secret as string);

    return token;
  }
}
