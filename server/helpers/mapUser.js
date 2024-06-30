module.exports = function(user) {
	return {
		id: user._id,
		userName: user.userName,
		email: user.email,
		roleId: user.role
	}
};
