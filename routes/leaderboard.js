var express = require('express');
var router = express.Router();
const { User, HighScore } = require('../models');
var authService = require('../services/auth');

router.get('/', (req, res, next) => {
    const token = req.cookies.jwt;
    authService.verifyUser(token).then(user => {
        HighScore.findAll().then(scores => {
            res.json(scores)
        })
    })
})


module.exports = router;