const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeEntrySchema = new Schema({
	startTime: {
		type: Date,
		required: true
	},
	endTime: {
		type: Date,
		required: true
	},
	taskId: {
		type: Schema.Types.ObjectId,
		ref: 'Task',
		required: true
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
}, {timestamps: true});

const TimeEntry = mongoose.model('TimeEntry', timeEntrySchema);
module.exports = TimeEntry;
