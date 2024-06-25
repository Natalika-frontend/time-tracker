const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	userName: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: Number,
		default: 1
	}
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;

