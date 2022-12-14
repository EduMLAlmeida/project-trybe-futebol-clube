import ITeamData from '../ITeamData';

export default interface ILeaderboardService {
  getData(filter: string): Promise<ITeamData[]>;
}
