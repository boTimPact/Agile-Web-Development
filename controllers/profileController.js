"use strict";
const User = require("../models/user");
const Product = require("../models/product");
const user = require("../models/user");

module.exports = {
  sendProfilePage: (req, res) => {
    let username;
    let isLoggedIn = false;
    if (req.cookies.username != null && req.cookies.username != undefined){
      username = req.cookies.username;
      isLoggedIn = true;
    }
    if(req.query.username != null && req.query.username != undefined){
      username = req.query.username;
      console.log("Profile: " + username);
    }
  
    let query = User.findOne({ username: username })
    query.exec()
    .then((userData) => {
      if (userData != null) {
        //console.log(userData)
        userData.profilePicture = "../public/images/profile.PNG"

        Product.find({ user: userData._id })
        .exec()
        .then((DBProducts) => {
          let products = [];
          //console.log(DBProducts)
          DBProducts.forEach((p) => {
            products.push(p);
          });

          let viewParameter = {
            loggedIn: isLoggedIn,
            profile: userData,
            page: "Profile",
            products: products,
          };
          if(isLoggedIn){
            Object.assign(viewParameter, {user: { username: req.cookies.username}});
          }
          console.log(viewParameter);
          res.render("profile.ejs", viewParameter);
        })
        .catch((err) => {
          console.log(err);
        });
      } else {
        //something went wrong
        //console.log("Error sending Profile Page")
        res.redirect("./");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  },

  deleteUser: (req, res) => {
    const user_id = req.cookies.user_id;
    console.log(user_id)

    // Delete user's products
    Product.deleteMany({ user: user_id })
      .exec()
      .then(() => {
        // Delete the user
        return User.findOneAndDelete({ username: req.cookies.username }).exec();
      })
      .then(() => {
        req.flash(
          "success", `! successfully deleted your profile !`
        );
        res.redirect("/logout");
      })
      .catch((error) => {
        console.log(`Error deleting user and products: ${error.message}`);
        next(error);
      });
  },

  getEditProfileForm: (req, res) => {
    let query = User.findOne({ username: req.cookies.username });
    query
      .exec()
      .then((userData) => {
        if (userData != null) {
          console.log(userData);
          userData.profilePicture = "../public/images/profile.PNG";

          let viewParameter = {
            loggedIn: true,
            user: userData,
            page: "Profile",
          };
          res.render("updateProfile.ejs", viewParameter);
        } else {
          console.log("something went wrong");
          res.redirect("./");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  updateProfile: (req, res) => {
    //get form data
    let userParams = {
      username: req.body.username,
      email: req.body.email,
      address: req.body.address
    }
    console.log("User: " + req.cookies.username);

    User.findOne({ username: req.cookies.username })
      .exec()
      .then(user => {
        //update data in db
        User.findByIdAndUpdate(user._id, { $set: userParams })
          .then(newUser => {
            console.log("Username: " + newUser.username);
            console.log("user updated");
            req.flash(
              "success", `! Userdata successfully updated !`
            );
            res.redirect("/profile");
          })
          .catch(err => {
            console.log("Error updating User")
            console.log(err.message)
            next(err)
          });
      })
      .catch(err => {
        console.log(err.message)
        next(err)
      });
  }
}