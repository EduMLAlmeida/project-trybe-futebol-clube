import { Router } from 'express';
import TeamService from '../services/TeamService';
import TeamController from '../controllers/TeamController';

const teamService = new TeamService();
const teamController = new TeamController(teamService);
const teamsRouter = Router();

teamsRouter.get('/teams', (req, res) => teamController.getAllTeams(req, res));

export default teamsRouter;
