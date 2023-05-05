"use strict";

exports.sendRegisterPage = (req, res) => {
    res.render("register.ejs", {page : "Register"});
}