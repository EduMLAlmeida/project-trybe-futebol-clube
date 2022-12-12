import NotFoundError from '../errors/not-found-error';
import IMatch from '../entities/IMatch';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import IScore from '../entities/IScore';

export default class MatchService {
  constructor(
    private matchModel = MatchModel,
    private teamModel = TeamModel,
  ) {
    this.matchModel = matchModel;
    this.teamModel = teamModel;
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

  async validateTeams(homeTeamId: number, awayTeamId: number) {
    const homeTeam = await this.teamModel.findOne({ where: { id: homeTeamId } });

    if (!homeTeam) {
      throw new NotFoundError('There is no team with such id!');
    }

    const awayTeam = await this.teamModel.findOne({ where: { id: awayTeamId } });

    if (!awayTeam) {
      throw new NotFoundError('There is no team with such id!');
    }
  }

  async createMatch(match: IMatch) {
    await this.validateTeams(match.homeTeam, match.awayTeam);

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

  async updateMatch(stringId: string, score: IScore) {
    const id = Number(stringId);

    const { homeTeamGoals, awayTeamGoals } = score;

    await this.matchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}
