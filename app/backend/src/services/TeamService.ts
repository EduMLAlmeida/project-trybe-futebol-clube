import TeamModel from '../database/models/TeamModel';
import ITeamService from '../entities/services/ITeamService';

export default class TeamService implements ITeamService {
  constructor(private teamModel = TeamModel) {
    this.teamModel = teamModel;
  }

  async getAllTeams() {
    const allTeams = await this.teamModel.findAll();

    return allTeams;
  }
}
