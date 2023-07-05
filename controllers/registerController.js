"use strict";

const passport = require("passport")
const user = require("../models/user");

module.exports = {
    sendRegisterPage: (req, res) => {
        res.render("register.ejs", { page: "Register" });
    },

    create: (req, res, next) => {
        if (req.skip) next();

        let newUser = new user({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            address: req.body.address
        });

        user.register(newUser, req.body.password, (error, user) => {
            if (user) {
                req.flash("success", `${newUser.username}'s account created successfully!`);
                res.cookie('username', newUser.username)
                res.cookie('user_id', newUser._id.toString())
                res.redirect("./")
                next();
            } else {
                req.flash("error", `Failed to create user account because: ${error.message}.`);
                res.redirect("/register")
                next();
            }
        });

    },
    verifyToken: (req, res, next) => {
        let token = req.query.apiToken;
        if (token) {
          user.findOne({ apiToken: token })
            .then(user => {
              if (user) next();
                      else next(new Error("Invalid API token."));
            })
            .catch(error => {
              next(new Error(error.message));
                  }); 
          } else {
          next(new Error("Invalid API token."));
        }
      }

}