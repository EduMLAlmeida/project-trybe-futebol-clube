import { Request, Response } from 'express';
import ILeaderboardService from '../entities/services/ILeaderboardService';

export default class LeaderboardController {
  private leaderboardService: ILeaderboardService;

  constructor(LeaderboardService: ILeaderboardService) {
    this.leaderboardService = LeaderboardService;
  }

  async getHomeData(req: Request, res: Response) {
    const homeData = await this.leaderboardService.getHomeData();

    return res.status(200).json(homeData);
  }
}
