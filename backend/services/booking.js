"use strict";

const status = require("statuses");
const { Booking } = require("../models");
const mongoose = require("mongoose");

const allBookings = async (req, res) => {

    const bookings = await Booking.find({}).exec() ;

    return res.status(status("OK")).json({message: "Booking retrieved successfully.", bookings});
}



const addingNewBooking = async (req, res) => {
    

    
    console.log(req.body,"req");
    
  const data=  await Booking.create({ 
    _id: mongoose.Types.ObjectId(),

    ...req.body
    })

    return res.status(status("CREATED")).json({ message: "Booking placed successfully." ,data});
}


const deletingBooking = async (req, res) => {
    

    
    const {id} = req.params ;
    const booking = await Booking.findById(id).exec() ;
    if (!booking) {
        return res.status(status("BAD REQUEST")).json({ message: "Booking does not exist." });
    }
    await Booking.deleteOne(booking);

    return res.status(status("OK")).json({ message: "Booking deleted successfully." });
}
exports.allBookings = allBookings;
exports.addingNewBooking = addingNewBooking;
exports.deletingBooking = deletingBooking;