import * as express from "express";
import { CreateConversationRequest, LeaveConversationRequest } from "./requests/requests";
import { getConversations, getUser, getConversation, insertOne, collections } from "./db";
import { CreateConversationResponse, LeaveConversationResponse, GetUserConversationsResponse, GetConversationDetailsResponse } from "./responses/responses";
import { ConversationInfo, Post } from "./models/models";

var router = express.Router();

router.get('/user/:username', async function (req, res, next) {
  const username: string = req.params.username;
  const data = (() => {
    return {
      username
    }
  })(); // TODO format as needed

  const user = await getUser(data.username);
  const response = await getConversations(user.conversations);

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

  const response = await getConversation(data.conversationId);
  
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
    return body;
  })(); // TODO format as needed

  const response = await insertOne(collections.Conversations, data);

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
