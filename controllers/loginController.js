"use strict";

const passport = require("passport");
const User = require("../models/user");

module.exports = {
    //http://localhost:3000/login
    sendLoginPage: (req, res) => {
        res.render("login.ejs", { page: "Login" });
    },

    authenticate:
        passport.authenticate('local', {
            failureRedirect: "/login",
            failureFlash: ("Failed to login."),
            successRedirect: "/login/success",
        }),

    loginSuccess: (req, res) => {
        res.cookie('username', req.user.username);
        res.cookie('user_id', req.user._id.toString());
        req.flash(
            "success", "! successfully logged in !"
        );

        res.redirect("/")
    },
    /*loginPost: (req, res) => {
        //reading form data
        let username = req.body.username
        let password = req.body.password

        let query = User.findOne({ username: username })
        query.exec()
            .then((user) => {
                console.log(user)
                //db.close() //TODO: reconnect does not work
                if (user !== null && user !== undefined) {
                    //user.passwordComparison(password)
                        /*.then(passwordMatch => {
                            if (passwordMatch) {
                                //redirect to homepage of authenticated user
                                req.flash(
                                    "success", "! successfully logged in !"
                                );
                                res.cookie('username', user.username);
                                res.cookie('user_id', user._id.toString());

                                res.redirect("./")
                            } else {
                                //false username and/or password
                                req.flash(
                                    "error", "! login failed !"
                                );
                                res.redirect("./login")
                            }
                        });
                } else {
                    req.flash(
                        "error", "! loggin failed !"
                    );
                    res.redirect("/login");
                }
            })
            .catch((err) => {
                console.log(err);
                next(err);
            });


    },*/


    logout: (req, res) => {
        res.clearCookie("username");
        res.clearCookie("user_id");
        req.flash(
            "success", "! successfully logged out !"
        );
        res.redirect("./")
    }
}