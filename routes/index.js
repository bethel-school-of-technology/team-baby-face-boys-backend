var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Route for creating an account
router.post('/createaccount', (req, res, next) => {
  
})

module.exports = router;
