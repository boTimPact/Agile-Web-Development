"use strict";

const user = require("../models/user");

exports.sendRegisterPage = (req, res) => {
    res.render("register.ejs", { page: "Register" });
}

exports.signUpPost = (req, res) => {
    let newUser = new user({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        address: req.body.address
    });

    user.findOne({ username: newUser.username })
        .exec()
        .then((user) => {
            console.log(user);
            if (user != null) {
                res.redirect = "/users/new";
                req.flash(
                    "error", `Username already in use!`
                );
                next();
            } else {
                newUser.save()
                    .then(() => {
                        req.flash(
                            "success", `${user.fullName}'s account created successfully!`
                        );
                        res.locals.user = user
                        res.cookie('username', newUser.username)
                        res.redirect("./?user=" + newUser.username);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        })
        .catch((err) => {
            console.log(`Error saving user: ${error.message}`);
            next();
        });
};