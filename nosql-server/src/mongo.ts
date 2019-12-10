// const mongoClient = require('mongodb').MongoClient;

import { MongoClient } from "mongodb";

// mongodb+srv://groupchatadmin:<groupchatadmin>@cluster0-lfwdy.mongodb.net/test?retryWrites=true&w=majority

const url = 'mongodb://username:password1234@ds253348.mlab.com:53348/groupchat-backend';
var mongoClient: MongoClient;

async function mongoConnect() {
  mongoClient = await MongoClient.connect(url);
}

export function mongoGet() {
  return mongoClient;
}

export async function mongoClose() {
  await mongoClient.close();
}