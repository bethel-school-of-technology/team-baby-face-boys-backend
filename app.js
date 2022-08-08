var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var models = require('./models');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var forumRouter = require('./routes/forum');
var profileRouter = require('./routes/profile');
var leaderboardRouter = require('./routes/leaderboard')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

models.sequelize.sync({ alter: false, force: false }).then(() => {
    console.log('DB synch')
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/forum', forumRouter);
app.use('/profile', profileRouter);
app.use('/leaderboard', leaderboardRouter);


module.exports = app;
