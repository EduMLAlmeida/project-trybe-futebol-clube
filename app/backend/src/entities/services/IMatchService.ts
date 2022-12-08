import MatchModel from '../../database/models/MatchModel';

export default interface IMatchService {
  getAllMatches(): Promise<MatchModel[]>
  getMatchesByProgress(queryParam: boolean): Promise<MatchModel[]>
}
