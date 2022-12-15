import { Request, Response } from 'express';
import ILeaderboardService from '../entities/services/ILeaderboardService';

export default class LeaderboardController {
  private leaderboardService: ILeaderboardService;

  constructor(LeaderboardService: ILeaderboardService) {
    this.leaderboardService = LeaderboardService;
  }

  async getHomeData(req: Request, res: Response) {
    const filter = 'home';

    const homeData = await this.leaderboardService.getData(filter);

    return res.status(200).json(homeData);
  }

  async getAwayData(req: Request, res: Response) {
    const filter = 'away';

    const homeData = await this.leaderboardService.getData(filter);

    return res.status(200).json(homeData);
  }

  async getData(req: Request, res: Response) {
    const filter = 'none';

    const homeData = await this.leaderboardService.getData(filter);

    return res.status(200).json(homeData);
  }
}
