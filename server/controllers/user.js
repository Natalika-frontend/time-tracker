const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generate } = require('../helpers/token');
const ROLES = require('../constants/roles');

async function register(userName, email, password){
	if (!password) {
		throw new Error('Password is empty');
	}

	const passwordHash = await bcrypt.hash(password, 10);

	const user = await User.create({ userName, email, password: passwordHash });
	const token = generate({ id: user.id})

	return { user, token };
};

async function login(email, password) {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error('User not found');
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password);

	if (!isPasswordMatch) {
		throw new Error('Wrong password');
	}

	const token = generate({ id: user.id})

	return {token, user}
};

function getUsers() {
	return User.find();
};

function updateUser(id, userData) {
	return User.findByIdAndUpdate(id, userData, {
		returnDocument: 'after'
	});
};

function getRoles() {
	return [
		{id: ROLES.ADMIN, name: 'Admin'},
		{id: ROLES.INDIVIDUALUSER, name: 'IndividualUser'},
		{id: ROLES.TEAMLEAD, name: 'TeamLead'},
		{id: ROLES.TEAMMEMBER, name: 'TeamMember'},
		{id: ROLES.GUEST, name: 'Guest'},
	];
};

function deleteUser(id) {
	return User.deleteOne({_id: id});
};

module.exports = {register, login, deleteUser, updateUser, getUsers, getRoles};
