var express = require('express');
var router = express.Router();
var Users = require('../models/users');
var Stories = require('../models/stories');

/* GET home page. */
router.get('/', function(req, res, next) {
  Stories.find().exec(function(err, stories){
    res.render('index', {stories});
  });
});
router.get('/signup', function(req, res, next) {
  res.render('signup');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/profile/:id', function(req, res, next) {
  Users.findOne({ _id : req.params.id}, function(err, user){
    res.render('myProfile',{user});
  });
});
router.get('/story/:id', function(req, res, next) {
  //console.log(req.params.id);
  Stories.findOne({ _id : req.params.id}, function(err, thisStory){
    res.render('story',{thisStory});
  });
});
router.get('/myStories/:username', function(req, res, next) {
  //res.send(req.params.username);
  Stories.find({ author : req.params.username}, function(err, authorStories){
    res.render('myStories',{authorStories});
  });
});
router.post('/createUser', function(req, res, next){
  //res.send(req.body);
  var user = new Users({
    username : req.body.username,
    password : req.body.password,
    userId : req.body._id
  });

  //console.log(user);

  if(req.body.username != '' && req.body.password != '' && req.body.repassword != '') {
      if(req.body.password == req.body.repassword){
          Users.findOne({ username : req.body.username}, function(err, userCheck){
            if(userCheck == null){
              var promise = user.save();
              promise.then((user) => {
                console.log('user signed with values', user);
                res.render('myProfile',{user});
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
        res.render('myProfile',{user});
      }else{
        console.log('User not valid');
      }
    });
  }else{
    console.log("Please enter username and password");
  }
});
router.post('/newPost',function(req, res){
  //res.send(req.body);
  var des = req.body.story;

  var story = new Stories({
    title : req.body.title,
    story : req.body.story,
    author : req.body.author,
    storyId : req.body.authorId
  });

  console.log(story);

  var promise = story.save();
  promise.then((story) => {
    console.log("Your story is ", story);

    Stories.find().exec(function(err, notes){
      res.redirect('/');
    });
  })
});
router.get('/deleteStory/:id', function(req, res){
  //console.log(req.params.id);
  Stories.remove({ _id : req.params.id }, function(err, delStory){
    res.redirect('/');
  });
});
router.get('/editStory/:id', function(req, res) {
  var storyId = req.params.id;
  Stories.findOne({ _id : storyId}).exec(function(err, story){
    res.render('editStory',{story});
  });
});
router.post('/saveEdited', function(req, res){
  //res.send(req.body);
  Stories.findOneAndUpdate({ _id : req.body._id }, { $set : req.body }, (err, note) => {
    if(!err){
      res.redirect('/');
    }else{
      console.log("Error!!");
    }
  })
});

module.exports = router;
