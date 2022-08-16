var express = require('express');
const { token } = require('morgan');
var router = express.Router();
const { User, HighScore } = require('../models');
var authService = require('../services/auth');

router.get('/:jwt', (req, res, next) => {
    const token = req.params.jwt;
    authService.verifyUser(token).then(user => {
        if(user){
            HighScore.findAll().then(scores => {
                res.json(scores)
            })
        } else{
            res.status(403).send('You must be logged in to see the leaderboard')
        }
    })
})

module.exports = router;