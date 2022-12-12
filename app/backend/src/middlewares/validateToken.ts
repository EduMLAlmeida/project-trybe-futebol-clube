import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import UnauthorizedError from '../errors/unauthorized-error';

dotenv.config();

const secret = process.env.JWT_SECRET;

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  try {
    jwt.verify(authorization as string, secret as string);
  } catch (error) {
    throw new UnauthorizedError('Token must be a valid token');
  }

  next();
};

export default validateToken;
