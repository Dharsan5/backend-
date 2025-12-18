const express=require("express");
const mongoose=require("mongoose");
const router = express.Router();
const courseModel=require("../models/CourseModel");
const auth = require("../Middleware/Auth");


router.get("/getcourse",(req, res) => {
    // console.log("get method");
    res.send("get course");
})
router.get("/studcourse", auth, async (req, res) => {
    try {
        const courses = await courseModel.find({});
        if(!courses){
            return res.json({message:"no course found"});
        }
        res.send(courses);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
router.post("/addcourse",auth, async (req, res) => {
    try {

        const { id, name } = req.body;
        const newCourse = new courseModel({
            id,
            name
        });
        await newCourse.save();//to save data to mongodb
        // students.push(newStudent);
        res.send(newCourse);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.put("/replacecourse/:id", auth, async(req, res) => {
    try{
    const { id } = req.params;
    const { name } = req.body;
    const updated = await courseModel.findByIdAndUpdate(id,{name});
     if(!updated){
        return res.json({message:"course not found"});
    }
}catch(err){
    res.json({message:err.message});
}
});

router.delete("/delete/:id", auth, async(req, res) => {
    try{
    const { id } = req.params;//req.body is also used to get data from request body
    const deleted = await courseModel.findByIdAndDelete(id);
    if(!deleted){
        return res.json({message:"course not found"});
    }
    res.send({message:"course details ", data:deleted.name});
}catch(err){
    res.json({message:err.message});
}
});

module.exports=router;