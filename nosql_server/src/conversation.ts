import * as express from "express";
import { CreateConversationRequest, LeaveConversationRequest } from "./requests/requests";
//import { executeScript, METHODS } from "./db";
import { CreateConversationResponse, LeaveConversationResponse, GetUserConversationsResponse, GetConversationDetailsResponse } from "./responses/responses";
import { ConversationInfo, Post } from "./models/models";

var router = express.Router();

/*
router.get('/user/:username', async function (req, res, next) {
  const username: string = req.params.username;
  const data = (() => {
    return {
      username
    }
  })(); // TODO format as needed

  const response = await executeScript(data, METHODS.getUserConversations);
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

  const conversationInfo: ConversationInfo = await executeScript(data, METHODS.getConversationById);
  const participants: { conversationId: string, username: string }[] = await executeScript(data, METHODS.getConversationParticipants);
  const posts: Post[] = await executeScript(data, METHODS.getConversationPosts);
  const transformedResponse: GetConversationDetailsResponse = (() => {
    return {
      conversation: {
        ...conversationInfo,
        participants: participants.map(p => p.username),
        posts
      }
    }
  })(); // TODO format as needed

  res.json(transformedResponse);
});

router.post('/create', async function (req, res, next) {
  const body: CreateConversationRequest = req.body;
  const data = (() => {
    return body;
  })(); // TODO format as needed

  const createResponse = await executeScript(data, METHODS.createConversation);
  const participantsResponse = await Promise.all(
    data.participants.map(p => {
      return executeScript({
        ...createResponse,
        username: p
      }, METHODS.createParticipant);
    })
  );
  const transformedResponse: CreateConversationResponse = (() => {
    return createResponse;
  })(); // TODO format as needed

  res.json(transformedResponse);
});

router.post('/leave', async function (req, res, next) {
  const body: LeaveConversationRequest = req.body;
  const data = (() => {
    return body;
  })(); // TODO format as needed

  const response = await executeScript(data, METHODS.leaveConversation);
  const transformedResponse: LeaveConversationResponse = (() => {
    return response;
  })(); // TODO format as needed

  res.json(transformedResponse);
});
*/

export default router;
