import * as express from "express";
import { SignInRequest, SignUpRequest, SignOutRequest } from "./requests/requests";
import { User } from "./models/models";
import { SignUpResponse, SignInResponse, SignOutResponse } from "./responses/responses";
import { userInfo } from "os";

var router = express.Router();
var db = require("./nosqldb");

/*
router.post('/signin', async function(req, res, next) {
  

  const body: SignInRequest = req.body;
  const data = (() => {
    return body;
  })(); // TODO format as needed

  const signinResponse: User = await executeScript(data, METHODS.signin);

  console.log('signin response', signinResponse);

  if (!!signinResponse && !!signinResponse.username) {
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
*/


/* NoSQL Implementation */

router.post('/signup', async function (req, res, next) {

  let body: SignUpRequest = req.body;
  body.timestamp = new Date();
  db.users.insert(body); 
  const data = (() => {
    return body;
  })(); 

  let user : User;
  user.username = body.username;
  user.firstName = body.firstName;
  user.lastName = body.lastName;
  user.email = body.email;
  user.pictureUrl = body.pictureUrl;
  user.timestamp = body.timestamp;
  
  if (!!body) {
    const transformedResponse: SignUpResponse = (() => {
      return {
        user: user,
        authToken: (new Date()).toDateString()
      }
    })(); 

    res.json(transformedResponse);
  } else {
    res.status(401).json('unable to signup');
  }
});



/*
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
*/

export default router;
