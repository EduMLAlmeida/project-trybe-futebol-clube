import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import UnauthorizedError from '../errors/unauthorized-error';

dotenv.config();

const secret = process.env.JWT_SECRET;

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  const verify = jwt.verify(authorization as string, secret as string);

  if (!verify) {
    throw new UnauthorizedError('You must be logged in');
  }

  next();
};

export default validateToken;
