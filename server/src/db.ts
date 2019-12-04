import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
const FormData = require('form-data');

const isDev = process.env.NODE_ENV !== 'production';
const BASE_URL = isDev ? 'http://ec2-54-245-14-178.us-west-2.compute.amazonaws.com' : 'http://<PROD_URL>';
const URL = `${BASE_URL}/databaseScript.php`;

export enum METHODS {
  signin = 'validateLogin',
  signup = 'addUser',
  signout = '',
  getUserConversations = 'getConversationsByUsername',
  getConversationById = 'getConversationById',
  getConversationParticipants = 'getAllParticipantsOfConversationWithConversationId',
  getConversationPosts = 'getAllPostsInConversation',
  createConversation = 'addConversation',
  leaveConversation = 'removeParticipant',
  createPost = 'addPost',
  deletePost = 'removePost',
  getUserShortcuts = 'getUserShortcuts',
  createShortcut = 'addShortcut',
  deleteShortcut = 'removeShortcut'
}

export interface Success {
  success: string | boolean;
}

async function post(url: string, body: any): Promise<any> {
  console.log(url, body);

  let data;

  console.log(`${(new FormData(body))}`);

  // return new Promise((resolve, reject) => {
  //   exec(`php backend/databaseScript.php ${new URLSearchParams(body)}`, function (error, stdout, stderr) {
  //     console.log(error, stdout, stderr);
  //     resolve(stdout);
  //   });
  // }).catch((error) => {
  //   console.log(error);
  //   return ''; // nothing
  // });

  try {
    const response = await fetch(url, {
      method: 'post',
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      body: new URLSearchParams(body)
    });

    if (response.status > 400) {
      console.error(`Invalid response status ${response.status}.`);
      throw response;
    }

    data = await response.json();

    return data;
  } catch (err) {
    console.error('An error ocurred while fetching data', err, data);
    return; // nothing
  }
}


export const executeScript = async (data: any, method: string) => {
  const body = {
    method,
    ...data
  }

  const response = await post(URL, body);

  return response;
}