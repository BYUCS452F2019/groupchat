import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
const FormData = require('form-data');

const isDev = process.env.NODE_ENV !== 'production';
const BASE_URL = isDev ? 'http://ec2-54-187-49-203.us-west-2.compute.amazonaws.com/groupchat' : 'http://<PROD_URL>';
const URL = `${BASE_URL}/databaseScript.php`;

// declare class URLSearchParams {
//   constructor()
// };

export enum METHODS {
  signin = 'validateLogin',
  signup = 'addUser',
  signout = '',
  getUserConversations = 'getConversationsByUsername',
  getConversationById = 'getConversationById',
  createParticipant = 'addParticipant',
  getConversationParticipants = 'getAllParticipantsOfConversationWithConversationId',
  getConversationPosts = 'getAllPostsInConversation',
  createConversation = 'addConversation',
  leaveConversation = 'removeParticipant',
  createPost = 'addPost',
  getPostById = 'getPostById',
  deletePost = 'removePost',
  getUserShortcuts = 'getUserShortcuts',
  getShortcutById = 'getShortcutById',
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
  console.log(body);

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

    console.log(data);

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