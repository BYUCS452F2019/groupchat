import * as express from "express";
import { CreatePostRequest } from "./requests/requests";
import { insertOne, updateConversation, updateType, getUser } from "./db";
import { CreatePostResponse, DeletePostResponse } from "./responses/responses";
import uuid = require("uuid");
import { Shortcut } from "./models/models";
var router = express.Router();

router.post('/create', async function (req, res, next) {
  const body: CreatePostRequest = req.body;
  const data = (() => {
    return {
      ...body,
      timestamp: new Date((new Date().getTime()) + 1000 * 60 * 60 * 7).toISOString(),
      postId: uuid()
    }
  })(); // TODO format as needed

  const response = await updateConversation(data.conversationId, 'posts', data, updateType.Push);
  const post = response.posts[response.posts.length - 1]
  const user = await getUser(data.username);

  let content: string = post.content;

  (user.shortcuts || []).forEach((s: Shortcut) => {
    const patternRegex = new RegExp(s.pattern, 'g');
    content = content.replace(patternRegex, s.command);
  });

  const transformedResponse: CreatePostResponse = (() => {
    return {
      post: {
        ...post,
        content: content,
        image: user.pictureUrl
      }
    };
  })(); // TODO format as needed

  res.json(transformedResponse);
});

router.delete('/delete/:postId', async function (req, res, next) {
  // const postId: string = req.params.postId;
  // const data = (() => {
  //   return {
  //     postId
  //   }
  // })(); // TODO format as needed

  // const response = await executeScript(data, METHODS.deletePost);
  // const transformedResponse: DeletePostResponse = (() => {
  //   return response;
  // })(); // TODO format as needed

  // res.json(transformedResponse);
});

export default router;
