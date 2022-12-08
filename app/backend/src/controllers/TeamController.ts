import { Request, Response } from 'express';
import ITeamService from '../entities/services/ITeamService';

export default class TeamController {
  private teamService: ITeamService;

  constructor(TeamService: ITeamService) {
    this.teamService = TeamService;
  }

  async getAllTeams(req: Request, res: Response) {
    const allTeams = await this.teamService.getAllTeams();

    return res.status(200).json(allTeams);
  }
}
