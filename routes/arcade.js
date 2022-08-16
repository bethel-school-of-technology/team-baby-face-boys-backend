var express = require('express');
var router = express.Router();
const { User } = require('../models');
var authService = require('../services/auth');
var moment = require('moment');

router.get('/:jwt', (req, res, next) => {
    const token = req.params.jwt;
    authService.verifyUser(token).then(user => {
        User.findOne({
            where: {
                id: user.id
            }
        }).then(user => {
           const userAge = moment().diff(moment(user.DOB), 'years') > 13
           if(userAge){
            res.json({
                gamerID: user.gamerID,
                DOB: user.DOB
            })
           } else {
            res.status(401).send('You are not old enough for this page')
           }
        })
    })
})



module.exports = router;