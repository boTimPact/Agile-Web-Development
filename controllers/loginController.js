"use strict";

exports.sendLoginPage = (req, res) => {
    res.render("login.ejs");
}

exports.loginPost = (req, res) => {
    let username = req.body.username
    //TODO: authenticate user
    //redirect to homepage
    res.redirect("./?user=" + username)
}