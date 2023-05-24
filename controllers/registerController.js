"use strict";

const user = require("../models/user");

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

    user.findOne({username: newUser.username})
    .exec()
    .then((user) => {
        console.log(user);
        if(user != null){
            res.send("Username already in use!");
        }else{
            newUser.save()
                .then(() => {
                    console.log("Success!")
                    res.redirect("./?user=" + newUser.username);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    })
    .catch((err) => {
        console.log(err);
    });
};