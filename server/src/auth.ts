import * as express from "express";
var router = express.Router();

router.post('/signin', function(req, res, next) {
  res.json({ response: 'response' });
});

router.post('/signup', function (req, res, next) {
  res.json({ response: 'response' });
});

router.post('/signout', function (req, res, next) {
  res.json({ response: 'response' });
});

export default router;
