var express = require('express');
var router = express.Router();

// localhost:3000/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET localhost:3000/home
// localhost:3000/user/asd
router.get('/login', function(req, res, next) {

  res.render('login');

});

router.get('/register', function(req, res, next) {
  
  res.render('register');

});

router.get('/user/:user', function(req, res, next) {
  let user = req.params.user
  res.render('index', {name: user});
});

router.get('/home', function(req, res, next) {
  res.render('index', {name: "ana nytochka"});
});

module.exports = router;
