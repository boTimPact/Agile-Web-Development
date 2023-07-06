"use strict";

const passport = require("passport");
const User = require("../models/user");

module.exports = {
    //http://localhost:3000/login
    sendLoginPage: (req, res) => {
        res.render("login.ejs", { page: "Login" });
    },

    authenticate: passport.authenticate('local',
        {
            failureRedirect: "/login",
            failureFlash: ("Failed to login."),
            successRedirect: "/login/success",
        }
    ),

    loginSuccess: (req, res) => {
        res.cookie('username', req.user.username);
        res.cookie('user_id', req.user._id.toString());
        req.flash(
            "success", "! successfully logged in !"
        );

        res.redirect("/")
    },

    logout: (req, res) => {
        res.clearCookie("username");
        res.clearCookie("user_id");
        req.flash(
            "success", "! successfully logged out !"
        );
        res.redirect("../")
    }
}