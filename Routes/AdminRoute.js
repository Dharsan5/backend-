const express = require("express");
const bcrypt=require("bcrypt");
const router = express.Router();
const studentModel=require('../models/StudentModel');

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
router.post("/login",async(req,res)=>{
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
        const  token=await jwt.sign({userId:user._id}, "BACKEND1812");
        res.cookie("token",token);
        res.json({message:"Login successful",data:user});
    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports=router;