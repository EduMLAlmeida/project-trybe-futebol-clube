import ITeam from '../ITeam';

export default interface ITeamService {
  getAllTeams(): Promise<ITeam[]>;
  getTeam(id: string): Promise<ITeam>;
}
