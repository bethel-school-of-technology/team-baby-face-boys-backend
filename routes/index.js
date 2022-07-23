var express = require('express');
var router = express.Router();
const { User } = require('../models');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//route for getting all users
router.get('/users', (req, res, nexrt) => {
  User.findAll().then(userList => {
    res.json(userList)
  })
})

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

//route for logging in
router.post('/login', async (req,res,next) => {
  User.findOne({
    where: {
      gamerID: req.body.gamerID,
      password: req.body.password
    }
  }).then(user => {
    res.json({
      gamerID: user.gamerID
    })
  })
})

module.exports = router;
