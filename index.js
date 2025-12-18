const express = require("express");
const mongoose = require("mongoose");//to import mongoose module use require
const connectDB = require('./Connection/Connect');//to connect to mongodb database
const app = express();
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser");
app.use(cookieParser());

app.use(express.json());//middleware to parse json data from request body
const studentRoute = require('./Routes/StudentRoute');
const courseRoute = require('./Routes/CourseRoute');
const adminRoute=require('./Routes/AdminRoute');


app.use("/students", studentRoute);
app.use("/courses", courseRoute);
app.use("/admin",adminRoute);

connectDB().then(() => {
    app.listen(4000, () => {
        console.log("Server is running on http://localhost:4000");
    });
});

//what is schema,why we use error handling,await - wait until the promise returns the value
//function call to connect to mongodb database

//mongoose.connect("mongodb://localhost:27017/BackendTech")//to connect to mongodb database
//promise based function resolve, reject, pending are the three states of a promise
//which helps to handle asynchronous operations in javascript
//.then is used to handle the resolved state of a promise
//.catch is used to handle the rejected state of a promise
//.finally is used to handle the pending state of a promise
//it is async in nature
// .then(()=>{//resolved
//     console.log("Connected to MongoDB");
//     app.listen(port,()=>{
//     console.log(`server is running on http://localhost:${port}`);
// })
// }).catch((err)=>{//rejected
//     console.log("Error connecting to MongoDB",err);
// });

// app.use("/",(req,res)=>{
//     res.send("Welcome to Express server");
// })
// app.listen(port,()=>{
//     console.log(`server is running on http://localhost:${port}`);

// })//first connect mongodb and then listen to the server how to establish this activity

//node js is a javascript runtime built on chrome v8 engine
//node js uses an event driven, non blocking I/O model

//event loop concept in node js
//npm - node package manager
//npm is used to manage the modules in nodejs
//modules are the libraries which are used to perform specific tasks in nodejs
//node js sunchronous single threated
//node js is asynchronous non blocking
//node js is used to build scalable network applications
//node js is built on chrome v8 engine
//node js is used to build server side applications
//node js is used to build command line tools
//node js is used to build desktop applications
//node js is used to build real time applications
//node js is used to build microservices
//node js is used to build APIs
//node js is used to build web applications
//node js is used to build mobile applications
//node js is used to build IoT applications
//node js is used to build chat applications
//node js is used to build streaming applications
//node js is used to build gaming applications
//node js is used to build e-commerce applications


//npm i nodemonto upadte the server automatically when changes occur
//nodemon index.js to run the server with nodemon
//node index.js to run the server with nodejs
//npm init -y to create package.json file
//"start":"nodemon index.js" in scripts of package.json to run server using npm start command
//npm start to run the server using the script defined in package.json file
//npm install express to install express module
//npm install to install all the modules defined in package.json file
//npm install express --save to install express module and save it in package.json file
//npm uninstall express to uninstall express module
//npm update to update all the modules defined in package.json file
//npm outdated to check which modules are outdated
//npm list to see the list of all installed modules
//npm init to create package.json file with custom settings
//npm init -y to create package.json file with default settings
//npm install express@4.17.1 to install specific version of express module
//npm install express --save-dev to install express module as a development dependency
//npm audit to check for security vulnerabilities in the installed modules
//npm audit fix to fix security vulnerabilities in the installed modules
//npm cache clean --force to clean the npm cache
//npm config set registry <registry-url> to set a custom registry for npm
//npm config get registry to get the current registry for npm
//npm help to see the help menu for npm commands
//npm help <command> to see the help menu for a specific npm command