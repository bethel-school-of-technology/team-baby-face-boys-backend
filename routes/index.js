var express = require('express');
var router = express.Router();
const { User } = require('../models');
var authService = require('../services/auth')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//route for getting all users
// router.get('/users', (req, res, next) => {
//   User.findAll().then(userList => {
//     res.json(userList)
//   })
// })

//Route for creating an account
router.post('/createaccount', (req, res, next) => {
  User.create({
    fullName: req.body.fullName,
    gamerID: req.body.gamerID,
    email: req.body.email,
    password: authService.hashPassword(req.body.password),
    DOB: req.body.DOB
  }).then(newUser => {
    res.json({
      fullName: newUser.fullName,
      gamerID: newUser.gamerID,
      email: newUser.email
    })
  }).catch(() => {
    res.status(400);
  })
})

//route for logging in
router.post('/login', async (req, res, next) => {
  User.findOne({
    where: {
      gamerID: req.body.gamerID
    }
  }).then(user => {
    if (!user) {
      res.status(401).json({
        message: 'User not found'
      })
    } else {
      let passwordMatch = authService.comparePasswords(req.body.password, user.password);
      if (passwordMatch) {
        let token = authService.signUser(user);
        res.cookie('jwt', token);
        res.send({token, user});
      } else {
        res.status(400).send('Invalid password');
      }
    }
  })
})

//Route for logging out
router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.send('Logged out');
});

module.exports = router;
