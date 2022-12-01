import { NextFunction, Request, Response } from 'express';
import MissingParamError from '../errors/missing-param-error';

const validateLoginBody = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new MissingParamError('All fields must be filled');
  }

  next();
};

export default validateLoginBody;
