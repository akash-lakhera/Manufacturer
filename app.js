const express = require("express");
const session = require("express-session");
const passport = require("passport");
const conn = require("./db");
const path = require("path");
const app = express();
const User = require("./models/user");
const mongoose = require("mongoose");
const Randomstring = require("randomstring");
port = process.env.PORT || 4000;
errorHandlerMid =require("./error");
app.use((req, res, next) => {
  next();
});
app.use(express.json()); //parse json
app.use(express.static(path.join(__dirname, "build"), { index: false }));
const MongoStore = require("connect-mongo")(session);
let sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: "sessions",
});
const checkAuth = (req, res, next) => {
  //checks logged in status of a user
  if (req.isAuthenticated()) {
    next();
  } else res.status(401).send("Unauthorised");
};
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    rolling: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
  })
);
require("./auth/passport");

const pathLogger = (req, res, next) => {

  next();
};
app.use(pathLogger);
app.use(passport.initialize());
app.use(passport.session());
app.post("/api/login", passport.authenticate("local"), (req, res, next) => {


  if (req.user.username)
    res.status(200).send(JSON.stringify({ message: "deez" }));
  else
    res
      .status(401)
      .send(JSON.stringify({ Error: new Error("wrong credentials") }));
});
app.get("/api/random", (req, res, next) => {
  let str =
    Randomstring.generate({
      length: 3,
      charset: "alphabetic",
    }).toUpperCase() +
    Randomstring.generate({
      length: 3,
      charset: "numeric",
    });
  res.status(200).send(JSON.stringify(str));
});
app.get("/api/transporters", async (req, res, next) => {
  let result = await User.find(
    { type: "Transporter" },

    {
      username: 1,
      type: 1,
    }
  );

  if (result.length) res.status(200).send(JSON.stringify(result));
  else res.status(404).send("no data");
});
app.get("/api/user", (req, res, next) => {

  if (req.user)
    res.status(200).send(
      JSON.stringify({
        username: req.user.username,
        type: req.user.type,
        address: req.user.address,
      })
    );
  else res.status(401).send("unauthorised");
});
app.post("/api/toTrans", async (req, res, next) => {
  await User.updateOne(
    { username: req.body.transporter },
    {
      $push: {
        messages: {
          orderID: req.body.orderID,
          quantity: req.body.quantity,
          manufacturer: req.body.manufacturer,
        },
      },
    }
  );
  res.send("done");
});
app.post("/api/toManu", async (req, res, next) => {
  await User.updateOne(
    { username: req.body.manufacturer },
    {
      $push: {
        messages: { orderID: req.body.orderID, price: req.body.price },
      },
    }
  );
  res.send("done");
});

app.get("/api/messages", async (req, res, next) => {
  msg = await User.findOne(
    { username: req.user.username },
    { _id: 0, __v: 0, username: 0, address: 0, password: 0, type: 0 }
  );

  if (msg) res.status(200).send(msg);
  else res.status(404).send("no messages");
});
app.post("/api/register", async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });

  if (user) {
    res.status(400).send({ Error: "Exists already" });
  } else {
    User.insertMany({
      username: req.body.username,
      password: req.body.password,
      address: req.body.address,
      type: req.body.type,
    });
    res.status(200).send("user created");
  }
});
app.get("*",(req,res,next)=>{
  res.status(200).sendFile(path.join(__dirname,"build","index.html"))
})
app.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.status(200).send({msg:"successful"})
  });
});
app.use(errorHandlerMid)
//start the server if database is connected
conn
  .then(() => {
    app.listen(port, () => {
  
    });
  })
  .catch((err) => {

    console.log(err);
  });
