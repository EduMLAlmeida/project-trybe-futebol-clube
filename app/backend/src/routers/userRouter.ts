import { Router } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
import validateLoginBody from '../middlewares/validateLoginBody';
import validateToken from '../middlewares/validateToken';

const userService = new UserService();
const userController = new UserController(userService);
const userRouter = Router();

userRouter.post(
  '/login',
  validateLoginBody,
  (req, res) => userController.login(req, res),
);

userRouter.get(
  '/login/validate',
  validateToken,
  (req, res) => UserController.loginValidate(req, res),
);
export default userRouter;
