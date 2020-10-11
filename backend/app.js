const config = require('./utils/config');
const express = require('express');
require('express-async-errors')
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blog');
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

mongoose
	.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		logger.info('connected to MongoDB');
	})
	.catch((error) => {
		logger.error('error connection to MongoDB:', error.message);
	});

app.use(cors({
  origin: 'https://mernblog.nicolaurlicic.com'
}));
app.use(middleware.tokenExtractor)
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/users', usersRouter)
app.use('/api/blogs', blogRouter);
app.use('/api/login', loginRouter);


if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controllers/reset')
	app.use('/api/testing', testingRouter)
}

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('build'));
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
