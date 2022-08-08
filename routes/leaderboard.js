var express = require('express');
var router = express.Router();
const { User, Post } = require('../models');
var authService = require('../services/auth');

router.get('/', (req, res, next) => {
    const token = req.cookies.jwt;
    authService.verifyUser(token).then(user => {
        res.json(user)
    })
})


module.exports = router;