const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const router = express.Router();
const validator = require("validator");
const studentModel = require('../models/StudentModel');
const jwt = require("jsonwebtoken");
const auth = require('../Middleware/Auth');




// auth middleware










//signup route
router.post("/signup", async (req, res) => {
    try {
        const { id, name, email, dept, password, role } = req.body;
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Password is not strong enough" });
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = new studentModel({
            id,
            name,
            email,
            dept,
            password: hashedpassword,
            role
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", data: newUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await studentModel.findOne({ email: email });
        if (user.role != 'student') {
            return res.json({ message: "Access denied. Not a student" });
        }
        const verifypassword = await bcrypt.compare(password, user.password);
        console.log(verifypassword);


        // const ispasswordcorrect=user.password==password;
        // console.log(ispasswordcorrect);
        if (verifypassword == false) {
            return res.json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, "BACKEND1812");
        console.log(token);
        res.cookie("token", token);
        res.json({ message: `${user.name} Login successful` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




// const studentschema = new mongoose.Schema({
//     id: {
//         type: Number,
//         required: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     dept: {
//         type: String,
//         required: true
//     }
// })
// const studentModel = mongoose.model("student", studentschema);
// function checkname(req,res,next){
//     if(true){
//     next();//decides whether to continue router or not
// }else{
//     throw new Error("Name is missing");
// }add checkname middleware after get method
// }




router.get("/get", (req, res) => {
    // console.log("get method");
    res.send("get method");
})
router.get("/stud", auth,async (req, res) => {           //auth remove here for testing frontend conole
    try {
        const students = await studentModel.find();
        res.json({ message: "students data", data: students });
    } catch (err) {
        res.status(500).send(err.message);
    }
});
//get student by id
router.get("/student/:id", auth, async (req, res) => {
    try {
        const loggeduser = req.user;
        console.log(loggeduser);
        const { id } = req.params;
        if (loggeduser !== id) {
            return res.json({ message: "Access denied" });
        }
        const stu = await studentModel.findById(id);
        res.json({ message: "student found", data: stu });
    } catch (err) {
        res.status(500).send(err.mesage);
    }
})

// app.get("/students",(req,res)=>{//if pasing two reponse it shows error for one round one response
//     res.send(students);
//     // console.log("get method");by giving this line it shows in terminal while not seen in browser 
//     // for first time we need to activate the api and then only we able to see in terminal
// })

// router.post("/add", async (req, res) => {
//     try {

//         const { id, name, email, dept } = req.body;
//         const newStudent = new studentModel({
//             id,
//             name,
//             email,
//             dept
//         });
//         await newStudent.save();//to save data to mongodb
//         // students.push(newStudent);
//         res.send(newStudent);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });
//put method to replace
router.put("/replace/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, dept } = req.body;
        const updated = await studentModel.findByIdAndUpdate(id, { name, email, dept });
        if (!updated) {
            return res.json({ message: "student not found" });
        }
        res.json({ message: "student detailsupdated", data: updated.name });

    } catch (err) {
        res.json({ message: err.message });
    }

});

router.delete("/delete/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;//req.body is also used to get data from request body
        const deleted = await studentModel.findByIdAndDelete(id);
        if (!deleted) {
            return res.json({ message: "student not found" });
        }
        res.send({ message: "student details ", data: deleted.name });

    } catch (err) {
        res.json({ message: err.message });
    }
});

router.patch("/assigncourse/:SID", auth, async (req, res) => {
    try {
        const { SID } = req.params;
        const { courseID } = req.body;
        const role = req.role
        if (role != 'admin') {
            return res.send("Admin only have permission")
        }
        console.log(role)
        const student = await studentModel.findById(SID)
        if (!student) {
            return res.json({ error: "no student found" })
        }
        console.log(courseID);
        const assign = await studentModel.findByIdAndUpdate(SID, { AssignedCourse: courseID });
        console.log(assign);
        res.json("course successfull")
    } catch (error) {
        res.send(error)
    }
})


module.exports = router;