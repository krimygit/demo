const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const route = require('./routes/v1')
const { errorConverter, errorHandler } = require('./middlewares/error');
const AppError = require('./utils/AppError');
const httpStatus = require('http-status')
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
}));

// Place morgan before routes to log all API calls
app.use(morgan("dev"));

app.use('/v1', route);

app.use(errorConverter);
app.use((req, res, next) => {
        next(new AppError(httpStatus.NOT_FOUND, 'Not found'));
});

// handle error
app.use(errorHandler);

module.exports = app;