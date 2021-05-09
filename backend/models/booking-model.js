"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  _id: Schema["Types"].ObjectId,
  name: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  } 
});

const Booking = mongoose.model("Booking", bookingSchema, "Bookings");

exports.Booking = Booking;
