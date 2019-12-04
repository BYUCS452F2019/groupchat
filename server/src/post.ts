import * as express from "express";
import { CreatePostRequest } from "./requests/requests";
import { executeScript, METHODS } from "./db";
import { CreatePostResponse, DeletePostResponse } from "./responses/responses";
var router = express.Router();

router.post('/create', async function (req, res, next) {
  const body: CreatePostRequest = req.body;
  const data = (() => {
    return body;
  })(); // TODO format as needed

  const response = await executeScript(data, METHODS.createPost);
  const transformedResponse: CreatePostResponse = (() => {
    return response;
  })(); // TODO format as needed

  res.json(transformedResponse);
});

router.delete('/delete/:postId', async function (req, res, next) {
  const postId: string = req.params.postId;
  const data = (() => {
    return {
      postId
    }
  })(); // TODO format as needed

  const response = await executeScript(data, METHODS.deletePost);
  const transformedResponse: DeletePostResponse = (() => {
    return response;
  })(); // TODO format as needed

  res.json(transformedResponse);
});

export default router;
