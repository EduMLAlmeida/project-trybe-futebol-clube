import ITeam from '../ITeam';

export default interface ITeamService {
  getAllTeams(): Promise<ITeam[]>;
}
