import * as express from "express";
import { SignInRequest, SignUpRequest, SignOutRequest } from "./requests/requests";
import { insertOne, collections, getUser } from "./db";
import { User } from "./models/models";
import { SignUpResponse, SignInResponse, SignOutResponse } from "./responses/responses";

var router = express.Router();

router.post('/signin', async function(req, res, next) {
  const body: SignInRequest = req.body;
  const data = (() => {
    return body;
  })(); // TODO format as needed

  const signinResponse: User = await getUser(data.username);

  if (!!signinResponse && !!signinResponse.username && signinResponse.password === data.password) {
    const transformedResponse: SignInResponse = (() => {
      return {
        user: signinResponse,
        authToken: (new Date()).toDateString()
      }
    })(); // TODO format as needed

    res.json(transformedResponse);
  } else {
    res.status(401).json({ error: 'unable to signin' });
  }
});

router.post('/signup', async function (req, res, next) {
  const body: SignUpRequest = req.body;
  const data = (() => {
    return body;
  })(); // TODO format as needed

  const createResponse: User = await insertOne(collections.Users, data);
  
  if (!!createResponse && !!createResponse.username) {
    const transformedResponse: SignUpResponse = (() => {
      return {
        user: createResponse,
        authToken: (new Date()).toDateString()
      }
    })(); // TODO format as needed

    res.json(transformedResponse);
  } else {
    res.status(401).json('unable to signup');
  }
});

router.post('/signout', async function (req, res, next) {
  // const body: SignOutRequest = req.body;
  // const data = (() => {
  //   return body;
  // })(); // TODO format as needed

  // const response = await executeScript(data, METHODS.signout);
  // const transformedResponse = (() => {
  //   return response;
  // })(); // TODO format as needed

  // res.json(transformedResponse);

  return await ({
    'success': true
  } as SignOutResponse);
});

export default router;
