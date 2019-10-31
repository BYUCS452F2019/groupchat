import * as express from "express";
var router = express.Router();

router.post('/create', function (req, res, next) {
  res.json({ response: 'response' });
});

router.delete('/delete/:postId', function (req, res, next) {
  res.json({ response: 'response' });
});

export default router;
