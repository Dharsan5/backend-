const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 4000;
async function connectDB() {//promise return function (async )
    await mongoose.connect("mongodb+srv://dharshansp:dharsansp@cluster0.5zmlarc.mongodb.net/BackendTech")
        .then(() => {//resolved
            console.log("Connected to MongoDB");
        }).catch((err) => {//rejected
            console.log("Error connecting to MongoDB", err);
        });
}
module.exports = connectDB;
