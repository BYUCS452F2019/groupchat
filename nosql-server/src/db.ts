import { mongoGet } from "./mongo";

// const isDev = process.env.NODE_ENV !== 'production';
// const BASE_URL = isDev ? 'http://ec2-54-187-49-203.us-west-2.compute.amazonaws.com/groupchat' : 'http://<PROD_URL>';
// const URL = `${BASE_URL}/databaseScript.php`;


export enum collections {
  Users = 'users',
  Conversations = 'conversations'
}

export enum updateType {
  Set = '$set',
  Push = '$push'
}

export async function insertOne(collection: collections, data) {
  const result = await mongoGet().db('gc').collection(collection).insertOne(data);

  return result.ops[0] as any;
}

export async function updateUser(username: string, key: string, value: any, updateType: updateType) {
  const query = {
    username
  };

  let updateObj = {};
  updateObj[key] = value;

  let update = {};
  update[updateType] = updateObj;

  return await updateCollection(collections.Users, query, update);
  // TODO use this formatted update object
}

export async function updateConversation(conversationId: string, key: string, value: any, updateType: updateType) {
  const query = {
    conversationId
  };

  let updateObj = {};
  updateObj[key] = value;

  let update = {};
  update[updateType] = updateObj;

  return await updateCollection(collections.Conversations, query, update);
}

async function updateCollection(collection: collections, query: any, update: any) {
  const result = await mongoGet().db('gc').collection(collection).update(query, update);

  // TODO search for inserted value if this returns an array
  return result.ops[0];
}

export async function getUser(username: string) {
  const query = {
    username
  };

  return await getOne(collections.Users, query);
}

export async function getConversation(conversationId: string) {
  const query = {
    conversationId
  };

  return await getOne(collections.Conversations, query);
}

export async function getConversations(conversationIds: string[]) {
  const query = {
    conversationIds: {
      "$in": conversationIds
    }
  };

  const cursorResult = await getMany(collections.Conversations, query);
  return cursorResult.toArray();
}

export async function getMany(collection: collections, query: any) {
  const result = await mongoGet().db('gc').collection(collection).find(query);

  return result;
}

export async function getOne(collection: collections, query: any) {
  const result = await mongoGet().db('gc').collection(collection).findOne(query);

  return result;
}