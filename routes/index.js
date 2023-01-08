var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.locals.welcome = welcome
  res.render('index', { title: 'Nodepop' });
});



module.exports = router;
