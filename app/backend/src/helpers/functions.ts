import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import IMatch from '../entities/IMatch';

const totalVictories = (teamRawData: IMatch[], filter: string) => {
  let total = 0;

  teamRawData.forEach((match) => {
    let condition = match.homeTeamGoals > match.awayTeamGoals;

    if (filter === 'away') {
      condition = match.awayTeamGoals > match.homeTeamGoals;
    }

    if (condition) {
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

const totalPoints = (teamRawData: IMatch[], filter: string) => {
  const victoryPoints = totalVictories(teamRawData, filter) * 3;

  const drawPoints = totalDraws(teamRawData) * 1;

  const total = victoryPoints + drawPoints;

  return total;
};

const totalLosses = (teamRawData: IMatch[], filter: string) => {
  let total = 0;

  teamRawData.forEach((match) => {
    let condition = match.homeTeamGoals < match.awayTeamGoals;

    if (filter === 'away') {
      condition = match.awayTeamGoals < match.homeTeamGoals;
    }

    if (condition) {
      total += 1;
    }
  });

  return total;
};

const goalsFavor = (teamRawData: IMatch[], filter: string) => {
  let total = 0;

  if (filter === 'home') {
    teamRawData.forEach((match) => {
      total += match.homeTeamGoals;
    });
  } else {
    teamRawData.forEach((match) => {
      total += match.awayTeamGoals;
    });
  }

  return total;
};

const goalsOwn = (teamRawData: IMatch[], filter: string) => {
  let total = 0;

  if (filter === 'home') {
    teamRawData.forEach((match) => {
      total += match.awayTeamGoals;
    });
  } else {
    teamRawData.forEach((match) => {
      total += match.homeTeamGoals;
    });
  }

  return total;
};

const goalsBalance = (teamRawData: IMatch[], filter: string) => {
  const favorGoals = goalsFavor(teamRawData, filter);

  const ownGoals = goalsOwn(teamRawData, filter);

  const total = favorGoals - ownGoals;

  return total;
};

const efficiency = (teamRawData: IMatch[], filter: string) => {
  const points = totalPoints(teamRawData, filter);

  const matches = teamRawData.length;

  const total = (points / (matches * 3)) * 100;

  return total.toFixed(2).toString();
};

const progressFilter = (inProgressMatches: MatchModel[], filter: string, team: TeamModel) => {
  if (filter === 'home') {
    const teamMatches = inProgressMatches.filter((match) => match.homeTeam === team.id);

    return teamMatches;
  }

  if (filter === 'away') {
    const teamMatches = inProgressMatches.filter((match) => match.awayTeam === team.id);

    return teamMatches;
  }
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
  progressFilter,
};
