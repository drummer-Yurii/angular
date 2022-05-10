const log=console.log;
// var express = require('express');
import express from 'express';
// var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

require('mongoose')
    // .connect(`mongodb+srv://user:${process.env.DB_PASS}@cluster0-bpnma.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
        require('mongoose').connect('mongodb://localhost/angular', {
        // useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useFindAndModify: false
    })
    .then(() => log('\n DB Connected!'.info))
    .catch(err => log(`DB Connection Error: ${err.message}`));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;