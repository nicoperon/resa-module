"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  _id: Schema["Types"].ObjectId,
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  } 
});

const Course = mongoose.model("Course", courseSchema, "Courses");

exports.Course = Course;
