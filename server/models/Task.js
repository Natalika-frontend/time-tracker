const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	taskName: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		trim: true
	},
	projectId: {
		type: Schema.Types.ObjectId,
		ref: 'Project',
		required: true
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	timeEntries: [{
		type: Schema.Types.ObjectId,
		ref: 'TimeEntry'
	}]
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
