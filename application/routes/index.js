var express = require('express');
var router = express.Router();

const Users = require('../models/Users');

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

router.get('/home', async function(req, res, next) {
  try{
    let users1 = await Users.viewUsers();
    res.render('home', {users: users1[0]});
  }catch(err){
    console.log(err);
    res.send(err)
    // ideally render error page
  }
});
//bS comments for the pushhh

module.exports = router;
