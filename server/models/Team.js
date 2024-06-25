const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
	teamName: {
		type: String,
		required: true,
		trim: true
	},
	members: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	projects: [{
		type: Schema.Types.ObjectId,
		ref: 'Project'
	}]
}, {timestamps: true});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
