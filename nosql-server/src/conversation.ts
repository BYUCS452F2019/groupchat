import * as express from "express";
import { CreateConversationRequest, LeaveConversationRequest } from "./requests/requests";
import { getConversations, getUser, getConversation, insertOne, collections, updateUser, updateType } from "./db";
import { CreateConversationResponse, LeaveConversationResponse, GetUserConversationsResponse, GetConversationDetailsResponse } from "./responses/responses";
import { ConversationInfo, Post, Conversation, Shortcut } from "./models/models";
import uuid from "uuid";

var router = express.Router();

router.get('/user/:username', async function (req, res, next) {
  const username: string = req.params.username;
  const data = (() => {
    return {
      username
    }
  })(); // TODO format as needed

  const user = await getUser(data.username);
  const response = await getConversations(user.conversations || []);

  const transformedResponse: GetUserConversationsResponse = (() => {
    return {
      conversations: response
    };
  })(); // TODO format as needed

  res.json(transformedResponse);
});

router.get('/details/:conversationId', async function (req, res, next) {
  const conversationId: string = req.params.conversationId;
  const data = (() => {
    return {
      conversationId
    }
  })(); // TODO format as needed

  let response = await getConversation(data.conversationId);
  
  let shortcutMap: Map<string, Shortcut[]> = new Map();
  let imageMap: Map<string, string> = new Map();

  for (let p of (response as Conversation).participants) {
    const user = (await getUser(p)) || { shortcuts: [] };

    shortcutMap.set(p, user.shortcuts);
    imageMap.set(p, user.pictureUrl);
  }

  (response.posts || []).forEach((p: Post) => {
    p.image = imageMap.get(p.username);
    
    const shortcuts = shortcutMap.get(p.username) || [];
    let content = p.content;

    (shortcuts || []).forEach((s) => {
      const patternRegex = new RegExp(s.pattern, 'g');
      content = content.replace(patternRegex, s.command);
    });

    p.content = content;
  });

  const transformedResponse: GetConversationDetailsResponse = (() => {
    return {
      conversation: response
    }
  })(); // TODO format as needed

  res.json(transformedResponse);
});

router.post('/create', async function (req, res, next) {
  const body: CreateConversationRequest = req.body;
  const data = (() => {
    return {
      ...body,
      conversationId: uuid()
    }
  })(); // TODO format as needed

  const response = await insertOne(collections.Conversations, data);
  
  await Promise.all(data.participants.map((p) => {
    return updateUser(p, 'conversations', response.conversationId, updateType.Push);
  }));

  const transformedResponse: CreateConversationResponse = (() => {
    return response;
  })(); // TODO format as needed

  res.json(transformedResponse);
});

router.post('/leave', async function (req, res, next) {
  // const body: LeaveConversationRequest = req.body;
  // const data = (() => {
  //   return body;
  // })(); // TODO format as needed

  // const response = await executeScript(data, METHODS.leaveConversation);
  // const transformedResponse: LeaveConversationResponse = (() => {
  //   return response;
  // })(); // TODO format as needed

  // res.json(transformedResponse);
});

export default router;
