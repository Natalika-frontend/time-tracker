const express = require('express');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const ROLES = require('../constants/roles');
const { createTeam, getTeams } = require('../controllers/team');
const mapTeam = require('../helpers/mapTeam');

const router = express.Router({mergeParams: true});

router.post('/teams',  authenticated, hasRole([ROLES.TEAMLEAD]), async (req, res) => {
	const team = await createTeam({ name: req.body.teamName, lead: req.body.lead });

	res.send({data: mapTeam(team)})
});

router.get('/teams', authenticated, hasRole([ROLES.TEAMLEAD]), async (req, res) => {
	const teams = await getTeams();
	res.send({data: teams.map(mapTeam)});
});

module.exports = router;
