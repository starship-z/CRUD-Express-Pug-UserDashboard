const express = require('express');
const bcrypt = require("bcrypt");
const router = express.Router();

const Users = require('../models/Users');
const db = require('../config/database');
// /api + "/ana"
/* GET home page. */
// localhost:3000/api/ana

// necessary arrays
let users = [];
let loggedIn = [];

/*
router.get('/register', function(req, res, next) {
 //res.send({status: true, name: "ana"})
  return res.send("hello")

  //application/html
  //application/json
  //application/css
});
*/ 

// get -> see data
// post -> change data

/*
MIME TYPES: 
application/php
application/json
application/text
application/html
application/image
application/css
application/js
*/

// register a user with a username and password
router.post('/register', async function(req, res, next) {
    let {username, password} =  req.body;
    try {
      console.log("before")
      let user = await Users.register(username, password);
      console.log("after")
      // console.log(user)
      return res.send({status: true, user})
    } catch(err){
      return res.send({status: false});
    }
   
});

// view all registered users
router.get("/viewUsers", async (req, res, next) =>{
  try {
    let users1 = await Users.viewUsers();
    if(!users1) return res.send({status: "No Users Found"});
    
    return res.send(users1[0]);

  } catch(err){
    return res.send({status: false});
  }
})

// get user by username
function getUser(username){
  let output = users.find(user => user.username === username);
  if (output){return output};
  return NULL;
}

// check if user exists by username
function userExists(username){
  let output = users.find(user =>user.username === username);
  if (output){return true};
  return false;
}

// check if logged in user exists
function loggedInUserExists(username){
  let output = loggedIn.find(user =>user.username === username);
  if (output){return true};
  return false;
}

// login in
async function authenticateUser(username, password){
  let user = getUser(username);
  if(user){
    return await bcrypt.compare(password, user.password);
  }
}

// login in a user
router.post('/login', async function(req, res, next) {
  let {username, password} = req.body;

  // if(loggedInUserExists(username)) return res.send({status: false}); // check if user is already logged in

  try{
    let [status, id] = await Users.authenticate(username, password);
    // res.locals.userid = id; 
    return res.send({status: status, user: id});
  }catch(err){
    console.log(err);
    return res.send({status: false});
  }
});

// log user out
router.post('/logout', async function(req, res, next) {
  let {username} = req.body;
  if(!loggedInUserExists(username)) return res.send({status: false});

  try{
    
    logout(username);
    return res.send({status: true, user: username});
    
    // user: function parameter
    // => arrow to function 
    // {return user.username != username}
    // user => 
  }catch(err){
    console.log(err);
    return res.send({status: false});
  }
});

// log out function to not repeat code
function logout(username){
  loggedIn = loggedIn.filter(user => {return user.username != username});
}

// delete function to not repeat code
function deleteUser(username){
  users = users.filter(user => {return user.username != username});
}

// delete a user
router.post('/delete', async function(req, res, next) {
  let {username} = req.body;
  if(!userExists(username)) return res.send({status: false});

  try{
    
    if(loggedInUserExists(username)) logout(username);
    deleteUser(username);
    return res.send({status: true, user: username});
    
    // user: function parameter
    // => arrow to function 
    // {return user.username != username}
    // user => 
  }catch(err){
    console.log(err);
    return res.send({status: false});
  }
});

// view all logged in users
router.get("/viewLoggedIn", (req, res, next) =>{
  res.send(loggedIn);
})

module.exports = router;