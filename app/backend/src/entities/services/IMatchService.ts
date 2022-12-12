import MatchModel from '../../database/models/MatchModel';
import IMatch from '../IMatch';
import IScore from '../IScore';

export default interface IMatchService {
  getAllMatches(): Promise<MatchModel[]>
  getMatchesByProgress(queryParam: boolean): Promise<MatchModel[]>
  createMatch(match: IMatch): Promise<IMatch>
  finishMatch(stringId: string): Promise<void>
  updateMatch(stringId: string, score: IScore): Promise<void>
}
