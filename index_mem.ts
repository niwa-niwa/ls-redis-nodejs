console.log("start mem express server");

import express from "express";
import session from "express-session";
import Redis from "ioredis";

declare module "express-session" {
  interface SessionData {
    firstAccessTime: string;
    counter: number;
    message: string;
  }
}


const app = express();

app.set("trust proxy", 1);

app.use(
  session({
    secret: "s3Cur3",
    name: "session", // default: connect.sid
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: "/", // default
      httpOnly: true, // default
      maxAge: 60 * 1000, // 10sec
    },
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (!req.session.firstAccessTime) {
    const now = new Date();
    req.session.firstAccessTime = now.toISOString();
  }

console.log("session",req.session)

  req.session.counter = req.session.counter ? req.session.counter + 1 : 1;

  next();
});

app.post("/message", (req, res) => {
  const message = req.body["message"];

  req.session.message = message;

  res.send({
    firstAccessTime: req.session.firstAccessTime,
    counter: req.session.counter,
    message: req.session.message,
  });
});

app.get("/message", (req, res) => {
  console.log("/message", req.session)

  res.send({
    firstAccessTime: req.session.firstAccessTime,
    counter: req.session.counter,
    message: req.session.message ? req.session.message : "Hello World",
  });
});

app.listen(3000, () => {
  console.log(`[${new Date().toISOString()}] start server[3000]`);
});
