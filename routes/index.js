var express = require('express');
var router = express.Router();

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

module.exports = router;
