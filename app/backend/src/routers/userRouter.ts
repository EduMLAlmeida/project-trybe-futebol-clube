import { Router } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';

const userService = new UserService();
const userController = new UserController(userService);
const userRouter = Router();

// userRouter.post('/login', (req, res) => res.status(200).json({ message: 'POST /login' }));
userRouter.post('/login', (req, res) => userController.login(req, res));

export default userRouter;
