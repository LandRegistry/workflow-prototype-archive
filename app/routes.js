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

  var items = [
    {
      'titleno':'DN31258',
      'abr': 'AC08178',
      'state': 'Allocated',
      'caseworker': 'John Smith'
    },
    {
      'titleno':'DN95674',
      'abr': 'AA16893',
      'state': 'Unallocated',
      'caseworker': null
    },
    {
      'titleno':'DN72309',
      'abr': 'AG13851',
      'state': 'Deferred',
      'caseworker': 'Mary Smith'
    },
    {
      'titleno':'DN10501',
      'abr': 'AG15172',
      'state': 'Deferred',
      'caseworker': 'Jack Jones'
    }
  ]

router.get('/search/results_return', function (req, res) {

  // get the titleNo and abr passed in
  var titleNo = req.query.titleNo.toUpperCase();
  var abr = req.query.abr.toUpperCase();

  // results, first is allocated to John smith, second is
  // unallocated, third is tied to the second, third is tied
  // to the first and fifth is unallocated on its own

  result = null

  for (i = 0; i < items.length; i++) {
    if ((abr == items[i]['abr']) && (titleNo == items[i]['titleno'])) {

      result = items[i];

      if (items[i]['caseworker'] == null) {
        result['caseworker'] = 'N/A'
      }

    }
  }

  res.render('search/results_return', {'result': result});

});

router.get('/search/results_obtain', function (req, res) {

  // get the titleNo and abr passed in
  var abr = req.query.abr.toUpperCase();

  // results, first is allocated to John smith, second is
  // unallocated, third is tied to the second, third is tied
  // to the first and fifth is unallocated on its own

  result = null

  for (i = 0; i < items.length; i++) {

    if (abr === items[i]['abr']) {

      result = items[i];

      if (items[i]['caseworker'] == null) {
        result['caseworker'] = 'N/A'
      }

    }
  }

  res.render('search/results_obtain', {'result': result});

});

router.get('/search/result_worklist', function (req, res) {

  var titleNo = req.query.titleNo;
  var abr = req.query.ABR;

  item = {
    'titleNo': titleNo,
    'abr': abr
  }

  res.render('search/result_worklist', {'item': item});

});

router.get('/search/return', function (req, res) {

  var titleNo = req.query.titleNo;

  res.render('search/return', {'titleNo': titleNo});

});

router.get('/choose-categories/obtain', function (req, res) {

  var cat = req.query.radio_contact_group;

  res.render('choose-categories/obtain', {'cat': cat})
})

module.exports = router;
