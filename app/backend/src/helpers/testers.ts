import ITeamData from '../entities/ITeamData';

const tester5 = (a: ITeamData, b: ITeamData) => b.totalPoints - a.totalPoints;

const tester4 = (a: ITeamData, b: ITeamData) => {
  const condition = a.totalPoints === b.totalPoints;

  if (condition) {
    return b.goalsBalance - a.goalsBalance;
  }

  return tester5(a, b);
};

const tester3 = (a: ITeamData, b: ITeamData) => {
  const condition2 = a.totalPoints === b.totalPoints
  && a.totalVictories === b.totalVictories;

  if (condition2) {
    return b.goalsBalance - a.goalsBalance;
  }

  return tester4(a, b);
};

const tester2 = (a: ITeamData, b: ITeamData) => {
  const condition3 = a.totalPoints === b.totalPoints
    && a.totalVictories === b.totalVictories
    && a.goalsBalance === b.goalsBalance;

  if (condition3) {
    return b.goalsFavor - a.goalsFavor;
  }

  return tester3(a, b);
};

const tester = (a: ITeamData, b: ITeamData) => {
  const condition4 = a.totalPoints === b.totalPoints
    && a.totalVictories === b.totalVictories
    && a.goalsBalance === b.goalsBalance
    && a.goalsFavor === b.goalsFavor;

  if (condition4) {
    return a.goalsOwn - b.goalsOwn;
  }

  return tester2(a, b);
};

export default tester;
