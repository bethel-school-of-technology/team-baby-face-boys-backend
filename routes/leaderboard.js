var express = require('express');
var router = express.Router();
const { User, HighScore } = require('../models');
var authService = require('../services/auth');

router.get('/', (req, res, next) => {
    const token = req.cookies.jwt;
    authService.verifyUser(token).then(user => {
        if(user){
            HighScore.findAll({
                order: [
                    ['WhackAMole', 'Desc']
                ]
            })
        } else {
            res.status(401).send('You must be logged in to see highscores')
        }
    }).then(scores => {
        res.json(scores)
    })
})

module.exports = router;