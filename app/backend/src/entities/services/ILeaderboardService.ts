import ITeamData from '../ITeamData';

export default interface ILeaderboardService {
  getHomeData(): Promise<ITeamData[]>;
}
