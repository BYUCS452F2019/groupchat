import * as express from "express";
import { CreatePostRequest, CreateShortcutRequest } from "./requests/requests";
import { getUser, updateConversation, updateUser, updateType } from "./db";
import { CreatePostResponse, CreateShortcutResponse, DeleteShortcutResponse, GetUserShortcutsResponse } from "./responses/responses";
var router = express.Router();

router.get('/user/:username', async function (req, res, next) {
  const username: string = req.params.username;
  const data = (() => {
    return {
      username
    }
  })(); // TODO format as needed

  const response = await getUser(data.username);

  const transformedResponse: GetUserShortcutsResponse = (() => {
    return {
      shortcuts: response.shortcuts
    };
  })(); // TODO format as needed

  res.json(transformedResponse);
});

router.post('/create', async function (req, res, next) {
  const body: CreateShortcutRequest = req.body;
  const data = (() => {
    return body;
  })(); // TODO format as needed

  const response = await updateUser(data.username, 'shortcuts', data, updateType.Push);
  
  const transformedResponse: CreateShortcutResponse = (() => {
    return {
      shortcut: response
    };
  })(); // TODO format as needed

  res.json(transformedResponse);
});

router.delete('/delete/:shortcutId', async function (req, res, next) {
  // const shortcutId: string = req.params.shortcutId;
  // const data = (() => {
  //   return {
  //     shortcutId
  //   }
  // })(); // TODO format as needed

  // const response = await executeScript(data, METHODS.deleteShortcut);
  // const transformedResponse: DeleteShortcutResponse = (() => {
  //   return response;
  // })(); // TODO format as needed

  // res.json(transformedResponse);
});

export default router;
