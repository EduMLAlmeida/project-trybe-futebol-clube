// import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';

export default class MatchService {
  constructor(private matchModel = MatchModel) {
    this.matchModel = matchModel;
  }

  async getAllMatches() {
    const allMatches = await this.matchModel.findAll({
      include: [
        { association: 'teamHome', attributes: { exclude: ['id'] } },
        { association: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return allMatches;
  }

  async getMatchesByProgress(queryParam: boolean) {
    const matchesByProgress = await this.matchModel.findAll({
      where: { inProgress: queryParam },
      include: [
        { association: 'teamHome', attributes: { exclude: ['id'] } },
        { association: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return matchesByProgress;
  }
}
