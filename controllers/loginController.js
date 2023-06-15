"use strict";

const User = require("../models/user");

//http://localhost:3000/login
exports.sendLoginPage = (req, res) => {
    res.render("login.ejs", { page: "Login" });
}

exports.loginPost = (req, res) => {
    //reading form data
    let username = req.body.username
    let password = req.body.password

    let query = User.findOne({ username: username })
    query.exec()
        .then((user) => {
            console.log(user)
            //db.close() //TODO: reconnect does not work
            if (user != null) {
                user.passwordComparison(password)
                    .then(passwordMatch => {
                        if (passwordMatch) {
                            //redirect to homepage of authenticated user
                            req.flash(
                                "success", "! successfully logged in !"
                            );
                            res.redirect("./?user=" + username)
                            res.locals.user = user;
                        } else {
                            //false username and/or password
                            req.flash(
                                "error", "! login failed !"
                            );
                            res.redirect("./login")
                        }
                    });
            } else {
                res.redirect = "/login";
                next();
            }
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
}
