import * as express from "express";
import { GET } from "./logging";
var router = express.Router();

router.get('/user/:username', function (req, res, next) {
  res.json({ response: 'response' });
});

router.get('/details/:conversationId', function (req, res, next) {
  res.json({ response: 'response' });
});

router.post('/create', function (req, res, next) {
  res.json({ response: 'response' });
});

router.post('/leave', function (req, res, next) {
  res.json({ response: 'response' });
});

export default router;
