const mongoose=require("mongoose");
const courseschema=new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    }
})
const courseModel=mongoose.model("stdcourse",courseschema);
module.exports=courseModel;