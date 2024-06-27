module.exports = function(team) {
	return {
		id: team.id,
		name: team.teamName,
		lead: team.lead,
		members: team.members,
		projects: team.projects
	}
};
