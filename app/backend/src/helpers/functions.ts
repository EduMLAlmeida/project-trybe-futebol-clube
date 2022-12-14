import IMatch from '../entities/IMatch';

const totalVictories = (teamRawData: IMatch[]) => {
  let total = 0;

  teamRawData.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      total += 1;
    }
  });

  return total;
};

const totalDraws = (teamRawData: IMatch[]) => {
  let total = 0;

  teamRawData.forEach((match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) {
      total += 1;
    }
  });

  return total;
};

const totalPoints = (teamRawData: IMatch[]) => {
  const victoryPoints = totalVictories(teamRawData) * 3;

  const drawPoints = totalDraws(teamRawData) * 1;

  const total = victoryPoints + drawPoints;

  return total;
};

const totalLosses = (teamRawData: IMatch[]) => {
  let total = 0;

  teamRawData.forEach((match) => {
    if (match.homeTeamGoals < match.awayTeamGoals) {
      total += 1;
    }
  });

  return total;
};

const goalsFavor = (teamRawData: IMatch[]) => {
  let total = 0;

  teamRawData.forEach((match) => {
    total += match.homeTeamGoals;
  });

  return total;
};

const goalsOwn = (teamRawData: IMatch[]) => {
  let total = 0;

  teamRawData.forEach((match) => {
    total += match.awayTeamGoals;
  });

  return total;
};

const goalsBalance = (teamRawData: IMatch[]) => {
  const favorGoals = goalsFavor(teamRawData);

  const ownGoals = goalsOwn(teamRawData);

  const total = favorGoals - ownGoals;

  return total;
};

const efficiency = (teamRawData: IMatch[]) => {
  const points = totalPoints(teamRawData);

  const matches = teamRawData.length;

  const total = (points / (matches * 3)) * 100;

  return total.toFixed(2).toString();
};

export {
  totalVictories,
  totalDraws,
  totalPoints,
  totalLosses,
  goalsFavor,
  goalsOwn,
  goalsBalance,
  efficiency,
};
