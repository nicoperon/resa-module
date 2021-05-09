"use strict";

const express = require("express");
const services = require("../services");

const courseRouter = express.Router();
courseRouter.get("/", services.courseService.allCourses); // Admin/User
courseRouter.post("/", services.courseService.addingNewCourse);// Admin/User
courseRouter.post("/update/:id", services.courseService.updatingCourse);// Admin/User
courseRouter.delete("/:id", services.courseService.deletingCourse) ; // Admin
exports.courseRouter = courseRouter;

const bookingRouter = express.Router();
bookingRouter.get("/", services.bookinService.allBookings); // Admin/User
bookingRouter.post("/", services.bookinService.addingNewBooking);// Admin/User
bookingRouter.delete("/:id", services.bookinService.deletingBooking) ; // Admin
exports.bookingRouter = bookingRouter;


const userRouter = express.Router();
userRouter.post("/register", services.userService.register);// Admin/User
userRouter.post("/login", services.userService.login);// Admin/User

exports.userRouter = userRouter;
