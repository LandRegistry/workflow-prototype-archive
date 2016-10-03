var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {

  res.render('index');

});

/**
 * Expose variables to all routes
 */
router.use(function (req, res, next) {
  // Pass the entire session through to the frontend
  // We dont have session. Yet...
  // res.locals.session = req.session;

  res.locals.data = {};

  // get
  for(var item in req.query) {
    if(req.query.hasOwnProperty(item)) {
      res.locals.data[item] = req.query[item];
    }
  }

  // post
  for(var item in req.body) {
    if(req.body.hasOwnProperty(item)) {
      res.locals.data[item] = req.body[item];
    }
  }

  next();

});

module.exports = router;
