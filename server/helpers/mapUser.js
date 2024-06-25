module.exports = function(user) {
	return {
		id: user.id,
		userName: user.userName,
		email: user.email,
		roleId: user.role
	}
};
