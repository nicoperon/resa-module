"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: Schema["Types"].ObjectId,
  name: {
    type: String,
  },
  
  username: {
    type: String,
    required: true,
  },
  
  password: {
    type: String,
    required: true,
  },
  
});

const User = mongoose.model("User", userSchema, "users");

exports.User = User;
