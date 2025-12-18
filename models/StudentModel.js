const mongoose = require("mongoose");
const studentschema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    dept: {
        type: String,
        required: true
    },
    password:{
        type: String, 
        required: true
    },
    role:{

        type:String,
        enum:['student','admin'],
    
    },
    assignedcoureses: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stdcourse'
    }
}, {
    timestamps: true
});
const studentModel = mongoose.model("student", studentschema);
module.exports = studentModel;