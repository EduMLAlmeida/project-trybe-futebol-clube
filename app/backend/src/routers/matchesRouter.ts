import { Router } from 'express';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';
import validateMatchBody from '../middlewares/validateMatchBody';

const matchService = new MatchService();
const matchController = new MatchController(matchService);
const matchesRouter = Router();

matchesRouter.get(
  '/matches',
  (req, res) => matchController.getMatches(req, res),
);

matchesRouter.post(
  '/matches',
  validateMatchBody,
  (req, res) => matchController.createMatch(req, res),
);

matchesRouter.patch(
  '/matches/:id/finish',
  (req, res) => matchController.finishMatch(req, res),
);

export default matchesRouter;
