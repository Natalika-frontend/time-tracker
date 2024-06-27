require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { MONGODB_CONNECTION_STRING } = require('./config');
const { register, login, getUsers, getRoles, updateUser, deleteUser } = require('./controllers/user');
const mapUser = require('./helpers/mapUser');
const authenticated = require('./middlewares/authenticated');
const hasRole = require('./middlewares/hasRole');
const ROLES = require('./constants/roles');
const routes = require('./routes/index');

const port = 5000;

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/', routes);



app.use(authenticated);

app.get('/users', hasRole([ROLES.ADMIN]), async (req, res) => {
	const users = await getUsers();

	res.send({data: users.map(mapUser)});
});

app.get('/users/roles', hasRole([ROLES.ADMIN]), async (req, res) => {
	const roles = await getRoles();

	res.send({data: roles});
});

app.patch('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
	const newUser = await updateUser(req.params.id, {
		role: req.body.roleId
	});

	res.send({data: mapUser(newUser)});
});

app.delete('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
	await deleteUser(req.params.id);

	res.send({ error: null});
});

mongoose.connect(MONGODB_CONNECTION_STRING).then(() => {
	app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
});
