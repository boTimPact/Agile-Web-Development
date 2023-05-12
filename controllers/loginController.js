"use strict";
//const mongoose = require("mongoose"),
    const User = require("../models/user");

//mongoose.Promise = global.Promise

//http://localhost:3000/login
exports.sendLoginPage = (req, res) => {
    res.render("login.ejs", { page: "Login" });
}

exports.loginPost = (req, res) => {
    //reading form data
    let username = req.body.username
    let password = req.body.password

    //db request
    //mongoose.connect("mongodb://localhost:27017/swappyDB", { useNewUrlParser: true })
    //let db = mongoose.connection

    let query = User.findOne({ username: username, password: password })
    query.exec()
        .then((resDB) => {
            console.log(resDB)
            //db.close() //TODO: reconnect does not work
            if (resDB != null) {
                //redirect to homepage of authenticated user
                res.redirect("./?user=" + username)
            } else {
                //false username and/or password
                res.redirect("./")
            }
        })
        .catch((err) => { console.log(err) })
}