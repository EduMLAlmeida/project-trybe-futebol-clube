import { NextFunction, Request, Response } from 'express';
import UnprocessableEntityError from '../errors/unprocessable-entity-error';

const validateMatchBody = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    throw new UnprocessableEntityError('It is not possible to create a match with two equal teams');
  }

  next();
};

export default validateMatchBody;
