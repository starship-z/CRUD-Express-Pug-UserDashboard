var express = require('express');
var router = express.Router();

/* GET home page. */
// localhost:3000/api/ana
router.get('/api/ana', function(req, res, next) {
  res.send({status: true, name: "ana"})
});

router.post('/api/auth', function(req, res, next) {
  let {username, password} = req.body;
  if(authenticateUser(username, password)) {
    //user authenticated
  }else {
    //user not autheticated
  }
  res.send({status: true, name: "ana"})
});


// localhost:3000/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
