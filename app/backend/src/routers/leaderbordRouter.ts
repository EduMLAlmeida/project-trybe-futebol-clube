import { Router } from 'express';
import LeaderboardService from '../services/LeaderBoardService';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);
const leaderboardRouter = Router();

leaderboardRouter.get(
  '/leaderboard/home',
  (req, res) => leaderboardController.getHomeData(req, res),
);

export default leaderboardRouter;
