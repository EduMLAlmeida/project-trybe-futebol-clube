import {
  totalVictories,
  totalDraws,
  totalPoints,
  totalLosses,
  goalsFavor,
  goalsOwn,
  goalsBalance,
  efficiency,
  teamFilter,
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

  static createTeamData(teamRawData: IMatch[], filter: string, team: TeamModel) {
    return {
      totalPoints: totalPoints(teamRawData, team),
      totalGames: teamRawData.length,
      totalVictories: totalVictories(teamRawData, team),
      totalDraws: totalDraws(teamRawData),
      totalLosses: totalLosses(teamRawData, team),
      goalsFavor: goalsFavor(teamRawData, team),
      goalsOwn: goalsOwn(teamRawData, team),
      goalsBalance: goalsBalance(teamRawData, team),
      efficiency: efficiency(teamRawData, team),
    };
  }

  async getData(filter: string) {
    const result: ITeamData[] = [];

    const allTeams = await this.teamModel.findAll();

    const allMatches = await this.matchModel.findAll();

    const inProgressMatches = allMatches.filter((match) => match.inProgress === false);

    allTeams.forEach(async (team) => {
      const teamMatches = teamFilter(inProgressMatches, filter, team);

      const teamData = LeaderboardService.createTeamData(teamMatches as IMatch[], filter, team);

      result.push({ name: team.teamName, ...teamData });
    });

    result.sort((a, b) => {
      const test = tester(a, b);
      return test as number;
    });

    return result;
  }
}
