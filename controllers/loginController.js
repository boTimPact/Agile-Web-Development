"use strict";

const jsonWebToken = require("jsonwebtoken");
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

    apiAuthenticate: (req, res, next) => {
        passport.authenticate("local", (errors, user) => {
            if (user) {
                let signedToken = jsonWebToken.sign(
                    {
                        data: user._id,
                        exp: new Date().setDate(new Date().getDate() + 1)
                    },
                    "secret_encoding_passphrase"
                );
                res.json({
                    success: true,
                    token: signedToken
                });
            } else
                res.json({
                    success: false,
                    message: "Could not authenticate user."
                });
        })(req, res, next);
    },

    verifyJWT: (req, res, next) => {
        let token = req.headers.token;
        if (token) {
            jsonWebToken.verify(
                token,
                "secret_encoding_passphrase",
                (errors, payload) => {
                    if (payload) {
                        User.findById(payload.data).then(user => {
                            if (user) {
                                next();
                            } else {
                                res.status(httpStatus.FORBIDDEN).json({
                                    error: true,
                                    message: "No User account found."
                                });
                            }
                        });
                    } else {
                        res.status(httpStatus.UNAUTHORIZED).json({
                            error: true,
                            message: "Cannot verify API token."
                        });
                        next();
                    }
                }
            )
        }
    },

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