import * as express from "express";
import { SignInRequest, SignUpRequest, SignOutRequest } from "./requests/requests";
var router = express.Router();

router.post('/signin', function(req, res, next) {
  const body: SignInRequest = req.body;

  res.json({ response: 'response' });
});

router.post('/signup', function (req, res, next) {
  const body: SignUpRequest = req.body;

  res.json({ response: 'response' });
});

router.post('/signout', function (req, res, next) {
  const body: SignOutRequest = req.body;

  res.json({ response: 'response' });
});

export default router;
