const Team = require('../models/Team');
const User = require('../models/User');
const mapUser = require('../helpers/mapUser');

async function createTeam({ name, lead: leadId }) {
	const lead = await User.findById(leadId);
	if (!lead) {
		throw new Error('Lead not found');
	}

	const team = new Team({ teamName: name, lead: leadId });

	return team.save();
};

async function getTeamsByLead(leadId) {
	return Team.find({ lead: leadId}).populate('lead').populate('members');
};

async function updateTeam(id, teamData) {
	const team = await Team.findByIdAndUpdate(id, teamData, {new: true}).populate('lead').populate('members');

	if (team.lead) {
		team.lead = mapUser(team.lead);
	}

	if (team.members && team.members.length > 0) {
		team.members = team.members.map(mapUser);
	}

	return team;
};

async function deleteTeam(id) {
	return Team.deleteOne({ _id: id });
};

module.exports = {createTeam, getTeamsByLead, updateTeam, deleteTeam};
