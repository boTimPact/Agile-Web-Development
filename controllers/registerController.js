"use strict";
const mongoose = require("mongoose"),
user = require("../models/user");

exports.sendRegisterPage = (req, res) => {
    res.render("register.ejs", {page : "Register"});
}

exports.signUpPost = (req, res) => {
    let newUser = new user({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        address: req.body.address
    });
    
    
    mongoose.connect("mongodb://91.58.14.60:27017/swappyDB", {useNewUrlParser: true});
    let db = mongoose.connection;

    newUser.save()
        .then(() => {
            console.log("Success!")
        })
        .catch((err) => {
            console.log(err);
        });

    res.redirect("./?user=" + newUser.username);
}