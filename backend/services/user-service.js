"use strict";
const status = require("statuses");
const { User } = require("../models");
const { Redemption } = require("../models");
const { OTP } = require("../models");
const config = require("../config");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");

const register = async (req, res) => {
  const { username,password } = req.body;

  const userAlreadyRegistered = await User.findOne({ username: username }).exec();
  if (userAlreadyRegistered) {
    return res.status(status("CONFLICT")).json({ message: "User already exists." });
  }

 const dataget= await User.create({
    _id: mongoose.Types.ObjectId(),
   ...req.body
  });
  return res.status(status("CREATED")).json({ message: "User created successfully." ,me:dataget});
};
const login = async (req, res) => {
  console.log("ssssssss")
 try{
  const { username,password} = req.body;

  const user = await User.findOne({username:username,password:password}).exec();
  console.log(user)
  if (user) {
    return res.status(status("OK")).json({ message: "." ,me:user});

  }
 
  return res.status(status("BAD REQUEST")).json({ message: "User Not found" });

 }
 catch(e)
 {
  return res.status(status("BAD REQUEST")).json({ message: e });

 }
  

};




exports.register = register;
exports.login=login;
