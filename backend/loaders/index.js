"use strict";

const cors = require("cors");
const express = require("express");
const config = require("../config");
const routes = require("../routes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const jsonwebtoken = require("jsonwebtoken");

dotenvExpand(dotenv.config());

const authenticateRequest = async (req, res, next) => {
  // const jwt = req.signedCookies["mesma_authentication"];
  // if (!jwt || jwt === "") {
  //   req.isAuthorized = false;
  //   return next();
  // }

  // jsonwebtoken.verify(jwt, config.privateKeys.jwtPrivateKey, { complete: true }, (error, decoded) => {
  //   if (error) {
  //     req.isAuthorized = false;
  //     return next();
  //   }

  //   req.isAuthorized = true;
  //   req.id = decoded.payload.id;
  //   next();
  // });
  req.id ="601c13cf5e61f11d9071b057"
  req.isAuthorized = true;
  next();

  
};

const connectWithMongoDB = async () => {
  try {
    await mongoose.connect(config.databaseConfig["uri"], {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error);
  }
};

const initializeServer = (serverPort) => {
  const backend = express();

  backend.use(cors({credentials: true}));
  backend.use(cookieParser(config.privateKeys.cookiePrivateKey));
  backend.use(authenticateRequest);
  backend.use(bodyParser.json({ limit: "100mb" }));
  backend.use("/booking", routes.bookingRouter);
  backend.use("/course", routes.courseRouter);
  backend.use("/user", routes.userRouter);

  connectWithMongoDB()
    .then(() => {
      backend.listen(serverPort);
      console.log("Server started listening on port", serverPort);
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.initializeServer = initializeServer;
