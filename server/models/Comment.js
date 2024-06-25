const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
	text: {
		type: String,
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

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
