const Team = require('../models/Team');
const User = require('../models/User');

async function createTeam({ name, lead: leadId }) {
	const lead = await User.findById(leadId);
	if (!lead) {
		throw new Error('Lead not found');
	}

	const team = new Team({ teamName: name, lead: leadId });

	return team.save();
};

async function getTeams() {
	return Team.find();
};

module.exports = {createTeam, getTeams};
