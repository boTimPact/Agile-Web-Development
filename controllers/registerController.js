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

    let query = user.findOne({username: newUser.username});
    query.exec()
        .then((resDB) => {
            console.log(resDB);
            if(resDB != null){
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
}