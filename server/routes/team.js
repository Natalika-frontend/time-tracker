const express = require('express');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const ROLES = require('../constants/roles');
const { createTeam, updateTeam, deleteTeam, getTeamsByLead, addMemberToTeam, removeMemberFromTeam } = require('../controllers/team');
const mapTeam = require('../helpers/mapTeam');

const router = express.Router({mergeParams: true});

router.post('/teams',  authenticated, hasRole([ROLES.TEAMLEAD]), async (req, res) => {
	const team = await createTeam({ name: req.body.teamName, lead: req.body.lead });

	res.send({data: mapTeam(team)})
});

router.get('/teams', authenticated, hasRole([ROLES.TEAMLEAD]), async (req, res) => {
	const teams = await getTeamsByLead(req.user.id);
	res.send({data: teams.map(mapTeam)});
});

router.patch('/teams/:id', authenticated, hasRole([ROLES.TEAMLEAD]), async (req, res) => {
	const updatedTeam = await updateTeam(req.params.id, req.body);

	res.send({data: mapTeam(updatedTeam)});
});

router.delete('/teams/:id', authenticated, hasRole([ROLES.TEAMLEAD]), async (req, res) => {
	await deleteTeam(req.params.id);

	res.send({ error: null });
});

router.post('/teams/:id/members', authenticated, hasRole([ROLES.TEAMLEAD]), async (req, res) => {
	const updatedTeam = await addMemberToTeam(req.params.id, req.body.userId);


	res.send({error: null, team: updatedTeam});
});

router.delete('/teams/:id/members/:userId', authenticated, hasRole([ROLES.TEAMLEAD]), async (req, res) => {
	await removeMemberFromTeam(req.params.id, req.params.userId);


	res.send({error: null});
});

module.exports = router;
