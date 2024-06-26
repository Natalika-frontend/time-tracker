const mapUser = require('./mapUser');

module.exports = function(team) {
	return {
		id: team._id,
		name: team.teamName,
		lead: mapUser(team.lead),
		members: team.members.map(mapUser),
		projects: team.projects
	}
};
