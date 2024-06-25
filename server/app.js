require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { MONGODB_CONNECTION_STRING } = require('./config');
const { register, login } = require('./controllers/user');
const mapUser = require('./helpers/mapUser');

const port = 5000;

const app = express();

app.use(cookieParser());
app.use(express.json());

app.post('/register', async (req, res) => {
	try {
		const user = await register(req.body.userName, req.body.email, req.body.password);

		res.send({ error: null, user: mapUser(user) });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

app.post('/login', async (req, res) => {
	try {
		const { user, token } = await login(req.body.email, req.body.password);

		res.cookie('token', token, { httpOnly: true })
			.send({ error: null, user: mapUser(user) });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

app.post('/logout', (req, res) => {
	res.cookie('token', '', { httpOnly: true })
		.send({});
});

mongoose.connect(MONGODB_CONNECTION_STRING).then(() => {
	app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
});
