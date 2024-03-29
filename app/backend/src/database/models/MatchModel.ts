import { INTEGER, Model, BOOLEAN } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

class MatchModel extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

MatchModel.belongsTo(TeamModel, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});

MatchModel.belongsTo(TeamModel, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

TeamModel.hasMany(MatchModel, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});

TeamModel.hasMany(MatchModel, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

export default MatchModel;
