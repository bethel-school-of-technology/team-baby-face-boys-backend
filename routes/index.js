var express = require('express');
var router = express.Router();
const { User } = require('../models');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Route for creating an account
router.post('/createaccount', (req, res, next) => {
  User.create({
    fullName: req.body.fullName,
    gamerID: req.body.gamerID,
    email: req.body.email,
    password: req.body.password,
    DOB: req.body.DOB
  }).then(newUser => {
    res.json(newUser)
  }).catch(() => {
    res.status(400);
  })
})
module.exports = router;
