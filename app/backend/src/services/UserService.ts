import IUserService from '../entities/services/IUserService';
import UserModel from '../database/models/UserModel';

export default class UserService implements IUserService {
  constructor(private userModel = UserModel) {
    this.userModel = userModel;
  }

  async login(): Promise<object> {
    const users = await this.userModel.findAll({});

    return users;
  }
}
