import * as express from "express";
import { CreatePostRequest, CreateShortcutRequest } from "./requests/requests";
import { executeScript, METHODS } from "./db";
import { CreatePostResponse, CreateShortcutResponse, DeleteShortcutResponse, GetUserShortcutsResponse } from "./responses/responses";
var router = express.Router();

router.get('/user/:username', async function (req, res, next) {
  const username: string = req.params.username;
  const data = (() => {
    return {
      username
    }
  })(); // TODO format as needed

  const response = await executeScript(data, METHODS.getUserShortcuts);
  const transformedResponse: GetUserShortcutsResponse = (() => {
    return {
      shortcuts: response
    };
  })(); // TODO format as needed

  res.json(transformedResponse);
});

router.post('/create', async function (req, res, next) {
  const body: CreateShortcutRequest = req.body;
  const data = (() => {
    return body;
  })(); // TODO format as needed

  const createResponse = await executeScript(data, METHODS.createShortcut);
  const getResponse = await executeScript(createResponse, METHODS.getShortcutById);
  const transformedResponse: CreateShortcutResponse = (() => {
    return {
      shortcut: getResponse
    };
  })(); // TODO format as needed

  res.json(transformedResponse);
});

router.delete('/delete/:shortcutId', async function (req, res, next) {
  const shortcutId: string = req.params.shortcutId;
  const data = (() => {
    return {
      shortcutId
    }
  })(); // TODO format as needed

  const response = await executeScript(data, METHODS.deleteShortcut);
  const transformedResponse: DeleteShortcutResponse = (() => {
    return response;
  })(); // TODO format as needed

  res.json(transformedResponse);
});

export default router;
