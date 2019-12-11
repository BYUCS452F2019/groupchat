import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import AuthRouter from './auth';
import ConversationRouter from './conversation';
import PostRouter from './post';
import ShortcutRouter from './shortcut';
import { GET, POST, DELETE } from "./logging";
import { mongoConnect } from "./mongo";

const app = express();
const port = 3000; // default port to listen

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  switch (req.method) {
    case 'GET':
      GET(req.url);
      break;
    case 'POST':
      POST(req.url);
      break;
    case 'DELETE':
      DELETE(req.url);
      break;
    default:
      break;
  }

  next();
});

app.use('/auth', AuthRouter);
app.use('/conversation', ConversationRouter);
app.use('/post', PostRouter);
app.use('/shortcut', ShortcutRouter);

app.use(express.static('public'));
// app.use(express.static('backend'));

// start the Express server
mongoConnect().then(() => {
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('could not connect to mongodb');
})

app.get("/", (req, res, next) => {
  res.send('I am not a Handler; Hear the words of my not random variable: Hello There!');
});