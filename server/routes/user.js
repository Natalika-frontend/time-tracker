const express = require('express');
const hasRole = require('../middlewares/hasRole');
const ROLES = require('../constants/roles');
const { getUsers, getRoles, updateUser, deleteUser } = require('../controllers/user');
const mapUser = require('../helpers/mapUser');
const authenticated = require('../middlewares/authenticated');

const router = express.Router({mergeParams: true});


router.get('/users', authenticated, hasRole([ROLES.ADMIN, ROLES.TEAMLEAD]), async (req, res) => {console.log('sdfsdfsd', req.body);
	const users = await getUsers();


	res.send({data: users.map(mapUser)});
});

router.get('/users/roles', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const roles = await getRoles();

	res.send({data: roles});
});

router.patch('/users/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const newUser = await updateUser(req.params.id, {
		role: req.body.roleId
	});

	res.send({data: mapUser(newUser)});
});

router.delete('/users/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	await deleteUser(req.params.id);

	res.send({ error: null});
});

module.exports = router;
