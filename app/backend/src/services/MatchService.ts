import IMatch from '../entities/IMatch';
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

  async createMatch(match: IMatch) {
    const requestedMatch = {
      ...match,
      inProgress: true,
    };

    const newMatch = await this.matchModel.create(requestedMatch);

    return newMatch;
  }

  async finishMatch(stringId: string) {
    const id = Number(stringId);

    await this.matchModel.update({ inProgress: false }, { where: { id } });
  }
}
