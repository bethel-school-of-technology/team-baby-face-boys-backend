var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var models = require('./models');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var forumRouter = require('./routes/forum');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

models.sequelize.sync({ }).then(() => {
    console.log('DB synch')
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/forum', forumRouter);

module.exports = app;
