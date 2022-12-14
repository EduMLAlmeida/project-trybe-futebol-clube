import {
  totalVictories,
  totalDraws,
  totalPoints,
  totalLosses,
  goalsFavor,
  goalsOwn,
  goalsBalance,
  efficiency,
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

  static createTeamData(teamRawData: IMatch[]) {
    return {
      totalPoints: totalPoints(teamRawData),
      totalGames: teamRawData.length,
      totalVictories: totalVictories(teamRawData),
      totalDraws: totalDraws(teamRawData),
      totalLosses: totalLosses(teamRawData),
      goalsFavor: goalsFavor(teamRawData),
      goalsOwn: goalsOwn(teamRawData),
      goalsBalance: goalsBalance(teamRawData),
      efficiency: efficiency(teamRawData),
    };
  }

  async getHomeData() {
    const result: ITeamData[] = [];

    const allTeams = await this.teamModel.findAll();

    const allMatches = await this.matchModel.findAll();

    const inProgressMatches = allMatches.filter((match) => match.inProgress === false);

    allTeams.forEach(async (team) => {
      const homeTeamMatches = inProgressMatches.filter((match) => match.homeTeam === team.id);

      const teamData = LeaderboardService.createTeamData(homeTeamMatches);

      result.push({ name: team.teamName, ...teamData });
    });

    result.sort((a, b) => {
      const test = tester(a, b);
      return test as number;
    });

    return result;
  }
}
