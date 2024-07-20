const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeEntrySchema = new Schema({
	taskId: {
		type: Schema.Types.ObjectId,
		ref: 'Task'
	},
	projectId: {
		type: Schema.Types.ObjectId,
		ref: 'Project'
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	minutes: {
		type: Number,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
}, { timestamps: true });

const TimeEntry = mongoose.model('TimeEntry', timeEntrySchema);
module.exports = TimeEntry;
