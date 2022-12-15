import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import IMatch from '../entities/IMatch';

const totalVictories = (teamRawData: IMatch[], team: TeamModel) => {
  let total = 0;

  teamRawData.forEach((match) => {
    let condition = match.homeTeamGoals > match.awayTeamGoals;

    if (match.awayTeam === team.id) {
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

const totalPoints = (teamRawData: IMatch[], team: TeamModel) => {
  const victoryPoints = totalVictories(teamRawData, team) * 3;

  const drawPoints = totalDraws(teamRawData) * 1;

  const total = victoryPoints + drawPoints;

  return total;
};

const totalLosses = (teamRawData: IMatch[], team:TeamModel) => {
  let total = 0;

  teamRawData.forEach((match) => {
    let condition = match.homeTeamGoals < match.awayTeamGoals;

    if (match.awayTeam === team.id) {
      condition = match.awayTeamGoals < match.homeTeamGoals;
    }

    if (condition) {
      total += 1;
    }
  });

  return total;
};

const goalsFavor = (teamRawData: IMatch[], team:TeamModel) => {
  let total = 0;

  teamRawData.forEach((match) => {
    if (match.homeTeam === team.id) {
      total += match.homeTeamGoals;
    } else {
      total += match.awayTeamGoals;
    }
  });

  return total;
};

const goalsOwn = (teamRawData: IMatch[], team:TeamModel) => {
  let total = 0;

  teamRawData.forEach((match) => {
    if (match.homeTeam === team.id) {
      total += match.awayTeamGoals;
    } else {
      total += match.homeTeamGoals;
    }
  });

  return total;
};

const goalsBalance = (teamRawData: IMatch[], team:TeamModel) => {
  const favorGoals = goalsFavor(teamRawData, team);

  const ownGoals = goalsOwn(teamRawData, team);

  const total = favorGoals - ownGoals;

  return total;
};

const efficiency = (teamRawData: IMatch[], team: TeamModel) => {
  const points = totalPoints(teamRawData, team);

  const matches = teamRawData.length;

  const total = (points / (matches * 3)) * 100;

  return total.toFixed(2).toString();
};

const teamFilter = (inProgressMatches: MatchModel[], filter: string, team: TeamModel) => {
  if (filter === 'home') {
    const teamMatches = inProgressMatches.filter((match) => match.homeTeam === team.id);

    return teamMatches;
  }

  if (filter === 'away') {
    const teamMatches = inProgressMatches.filter((match) => match.awayTeam === team.id);

    return teamMatches;
  }

  if (filter === 'none') {
    const teamMatches = inProgressMatches.filter((match) => match.awayTeam === team.id
      || match.homeTeam === team.id);

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
  teamFilter,
};
