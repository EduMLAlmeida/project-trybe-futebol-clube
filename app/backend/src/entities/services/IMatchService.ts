import MatchModel from '../../database/models/MatchModel';
import IMatch from '../IMatch';

export default interface IMatchService {
  getAllMatches(): Promise<MatchModel[]>
  getMatchesByProgress(queryParam: boolean): Promise<MatchModel[]>
  createMatch(match: IMatch): Promise<IMatch>
  finishMatch(stringId: string): Promise<void>
}
