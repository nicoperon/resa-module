"use strict";

const status = require("statuses");
const { Course } = require("../models");
const mongoose = require("mongoose");
const fs=require('fs');
const path=require('path');

const allCourses = async (req, res) => {

    const courses = await Course.find({}).exec() ;

    return res.status(status("OK")).json({message: "Courses retrieved successfully.", courses});
}



const addingNewCourse = async (req, res) => {
    

        const {name,image}=req.body;

    // console.log(req.url,"req");
    // let filePath=`/files/${Date.now()}_${name}.jpg`
    // let buffer=Buffer.from(image.split(',')[1],"base64")
    // fs.writeFileSync(path.join(__dirname,filePath),buffer)

  const data=  await Course.create({ 
    _id: mongoose.Types.ObjectId(),
    name,
    image,
    })

    return res.status(status("CREATED")).json({ message: "Courses placed successfully." ,data});
}
const updatingCourse = async (req, res) => {
    
    const {id} = req.params ;
  
    const course = await Course.findById(id).exec() ;
  
    if (!course) {
      return res.status(status("BAD REQUEST")).json({ message: "Course does not exist." });
    }
  
    const {name,image} = req.body ;
    
    if (name) {
      course.name = name;
    }
    if (image) {
      course.image = image;
    }
    
    await course.save();
  
    return res.status(status("OK")).json({ message: "Course updated successfully."});
  }
  

const deletingCourse = async (req, res) => {
    

    console.log(req.params)
    const {id} = req.params ;
    const course = await Course.findById(id).exec() ;
    if (!course) {
        return res.status(status("BAD REQUEST")).json({ message: "Course does not exist." });
    }
    await Course.deleteOne(course);

    return res.status(status("OK")).json({ message: "Course deleted successfully." });
}
exports.allCourses = allCourses;
exports.addingNewCourse = addingNewCourse;
exports.deletingCourse = deletingCourse;
exports.updatingCourse = updatingCourse;