const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
	projectName: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		required: true,
		trim: true
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	teamId: {
		type: Schema.Types.ObjectId,
		ref: 'Team',
	},
	tasks: [{
		type: Schema.Types.ObjectId,
		ref: 'Task'
	}]
}, {timestamps: true});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
