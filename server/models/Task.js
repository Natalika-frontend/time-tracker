const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	projectId: {
		type: Schema.Types.ObjectId,
		ref: 'Project',
		required: true
	},
	title: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		trim: true
	},
	assignedTo: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		default: null
	},
	status: {
		type: String,
		enum: ['pending', 'in progress', 'completed'],
		default: 'pending',
	},
	timeEntries: [{
		type: Schema.Types.ObjectId,
		ref: 'TimeEntry'
	}]
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
