import { Request, Response } from 'express';
import IMatchService from '../entities/services/IMatchService';

export default class MatchController {
  private matchService: IMatchService;

  constructor(MatchService: IMatchService) {
    this.matchService = MatchService;
  }

  async getMatches(req: Request, res: Response) {
    if (req.query.inProgress) {
      const queryParam = req.query.inProgress === 'true';

      const matchesByProgress = await this.matchService.getMatchesByProgress(queryParam);

      return res.status(200).json(matchesByProgress);
    }

    const allMatches = await this.matchService.getAllMatches();

    return res.status(200).json(allMatches);
  }

  async createMatch(req: Request, res: Response) {
    const newMatch = await this.matchService.createMatch(req.body);

    return res.status(201).json(newMatch);
  }

  async finishMatch(req: Request, res: Response) {
    await this.matchService.finishMatch(req.params.id);

    return res.status(200).json({ message: 'Finished' });
  }
}
