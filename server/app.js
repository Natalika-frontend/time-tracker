require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { MONGODB_CONNECTION_STRING } = require('./config');
const routes = require('./routes/index');

const port = 5000;

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/', routes);

mongoose.connect(MONGODB_CONNECTION_STRING).then(() => {
	app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
});
