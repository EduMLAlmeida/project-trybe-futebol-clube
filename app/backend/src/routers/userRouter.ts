import { Router } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
import validateLoginBody from '../middlewares/validateLoginBody';

const userService = new UserService();
const userController = new UserController(userService);
const userRouter = Router();

userRouter.post('/login', validateLoginBody, (req, res) => userController.login(req, res));

export default userRouter;
