const jwt = require("jsonwebtoken");
const studentModel = require('../models/StudentModel');
const router = require('express').Router();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");


const auth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        console.log(token);
        if (!token) {
            return res.json({ message: "no token found" });
        }
        const decoded = await jwt.verify(token, "BACKEND1812");
        console.log(decoded);
        if (!decoded) {
            return res.json({ message: "invalid token" });
        }
        const { userId } = decoded;
        const st = await studentModel.findById(userId);
        console.log(st);
        if (!st) {
            return res.json({ message: "no student found" });
        }
        req.user = userId;
        next();

    } catch (err) {
        res.json({ message: err.message });
    }
};

module.exports = auth;