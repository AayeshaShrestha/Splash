var express = require('express');
var router = express.Router();
var Users = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/profile', function(req, res, next) {
  res.render('myProfile');
});

router.get('/story', function(req, res, next) {
  res.render('story');
});

router.get('/myStories', function(req, res, next) {
  res.render('myStories');
});

router.post('/createUser', function(req, res, next){
  //res.send(req.body);
  var user = new Users({
    username : req.body.username,
    password : req.body.password
  });

  if(req.body.username != '' && req.body.password != '' && req.body.repassword != '') {
      if(req.body.password == req.body.repassword){
          Users.findOne({ username : req.body.username}, function(err, userCheck){
            if(userCheck == null){
              var promise = user.save();
              promise.then((user) => {
                console.log('user signed with values', user);
                res.redirect('/profile');
              });
            }else{
              console.log("Username already exists.");
            }
          });
      }
      else{
      console.log("passwords donot match");
      }
  }else{
    console.log("Please fill all the fields");
  }
});

router.post('/login',function(req,res){
  //console.log(req.body);
  if(req.body.username && req.body.password){
    Users.findOne({username : req.body.username, password : req.body.password}, function(err, user){
      if(user != null){
        console.log('Logged in with ', user);
        res.redirect('/profile');
      }else{
        console.log('User not valid');
      }
    });
  }else{
    console.log("Please enter username and password");
  }

});

module.exports = router;
