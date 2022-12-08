import { Router } from 'express';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';

const matchService = new MatchService();
const matchController = new MatchController(matchService);
const matchesRouter = Router();

matchesRouter.get('/matches', (req, res) => matchController.getMatches(req, res));

export default matchesRouter;
