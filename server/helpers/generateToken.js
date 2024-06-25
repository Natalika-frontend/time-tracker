const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports = function(data) {
	return jwt.sign(data, JWT_SECRET, {expiresIn: '30d'});
};
