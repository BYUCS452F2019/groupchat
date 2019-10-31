import * as express from "express";
var router = express.Router();

router.get('/user/:username', function (req, res, next) {
  res.json({ response: 'response' });
});

router.post('/create', function (req, res, next) {
  res.json({ response: 'response' });
});

router.delete('/delete', function (req, res, next) {
  res.json({ response: 'response' });
});

export default router;
