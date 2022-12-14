import {
  totalVictories,
  totalDraws,
  totalPoints,
  totalLosses,
  goalsFavor,
  goalsOwn,
  goalsBalance,
  efficiency,
  progressFilter,
} from '../helpers/functions';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import ILeaderboardService from '../entities/services/ILeaderboardService';
import IMatch from '../entities/IMatch';
import ITeamData from '../entities/ITeamData';
import tester from '../helpers/testers';

export default class LeaderboardService implements ILeaderboardService {
  constructor(
    private teamModel = TeamModel,
    private matchModel = MatchModel,
  ) {
    this.teamModel = teamModel;
    this.matchModel = matchModel;
  }

  static createTeamData(teamRawData: IMatch[], filter: string) {
    return {
      totalPoints: totalPoints(teamRawData, filter),
      totalGames: teamRawData.length,
      totalVictories: totalVictories(teamRawData, filter),
      totalDraws: totalDraws(teamRawData),
      totalLosses: totalLosses(teamRawData, filter),
      goalsFavor: goalsFavor(teamRawData, filter),
      goalsOwn: goalsOwn(teamRawData, filter),
      goalsBalance: goalsBalance(teamRawData, filter),
      efficiency: efficiency(teamRawData, filter),
    };
  }

  async getData(filter: string) {
    const result: ITeamData[] = [];

    const allTeams = await this.teamModel.findAll();

    const allMatches = await this.matchModel.findAll();

    const inProgressMatches = allMatches.filter((match) => match.inProgress === false);

    allTeams.forEach(async (team) => {
      const teamMatches = progressFilter(inProgressMatches, filter, team);

      const teamData = LeaderboardService.createTeamData(teamMatches as IMatch[], filter);

      result.push({ name: team.teamName, ...teamData });
    });

    result.sort((a, b) => {
      const test = tester(a, b);
      return test as number;
    });

    return result;
  }
}
