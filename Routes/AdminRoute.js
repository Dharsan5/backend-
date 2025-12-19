const express = require("express");
const bcrypt=require("bcrypt");
const router = express.Router();
const studentModel=require('../models/StudentModel');
const jwt=require('jsonwebtoken');
const validator=require('validator');
const auth=require('../Middleware/Auth');
const courseModel=require("../models/CourseModel");

//signup route
router.post("/signup",async(req,res)=>{
    try{
        const{id,name,email,dept,password,role}=req.body;
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Invalid email format"});
        }
        if(!validator.isStrongPassword(password)){
            return res.status(400).json({message:"Password is not strong enough"});
        }
        const hashedpassword=await bcrypt.hash(password,10);
        const newUser=new studentModel({
            id,
            name,
            email,
            dept,
            password:hashedpassword,
            role
        });
        await newUser.save();
        res.status(201).json({message:"User registered successfully",data:newUser});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
//login route
router.post("/adminlogin",async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await studentModel.findOne({email:email});
        if(user.role!='admin'){
            return res.status(401).json({message:"Access denied. Not a admin"});
        }
        const verifypassword=await bcrypt.compare(password,user.password);
        console.log(verifypassword);
        if(verifypassword==false){
            return res.status(401).json({message:"Invalid credentials"});
        }

        const token=await jwt.sign({userId:user._id},"BACKEND2507");
        res.cookie("token",token);//to tore token but not in database local storage or session storage in frontend
        res.json({message:"Login successful",data:user});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});
//patch route to update admin details alreaday present in database after i need to aasign course to student 
router.patch("/assigncourse/:sid",auth,async(req, res) => {
    try{
        console.log("Assign course route accessed");
        const {sid}=req.params;
        console.log("Student ID:", sid);
        const {courseId}=req.body;
        console.log("Course ID:", courseId);
        const student=await studentModel.findById(sid);
        if(!student){
            return res.json({message:"student not found"});
        }
        console.log("Student found:", student);
        const coursedetails={
            id:courseId.id,
            name:courseId.name
        }
        const assign=await studentModel.findByIdAndUpdate(sid,{$push:{AssignedCourses:courseId}},{new:true});
         if(!assign){
            return res.json({message:"course not assigned"});
        }
        res.json({message:"Course assigned successfully", data:assign});
       
    }catch(err){
        res.status(500).json({message:err.message});
    }
});



router.get("/getadmin", (req, res) => {
    // console.log("get method");
    res.send("get method");
})
router.get("/adminname", auth, async (req, res) => {
    try {
        //i wrote middleware function here and then changed to middleware folder
        if(req.role=='admin'){
            const st = await studentModel.find({});
        if (!st) {
            return res.json({ message: "no student found.access denied" });
        }
       
        } else {
             res.json(st);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});



module.exports=router;