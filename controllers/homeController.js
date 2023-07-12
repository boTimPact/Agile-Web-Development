"use strict";
const { serialize } = require("mongodb");
const Product = require("../models/product");

module.exports = {
  sendHomePage: (req, res) => {

    let viewParameter;
    if (req.cookies.username != null && req.cookies.username != undefined) {
      let user = {
        username: req.cookies.username,
        profilePicture: "../public/images/profile.PNG", // This should be the actual path to the user's profile picture
      };
      viewParameter = { loggedIn: true, user: user, page: "Home"}
    } else {
      viewParameter = { loggedIn: false, page: "Home"}
    }
    res.render("index.ejs", viewParameter)
  },

  search: (req, res) => {
    let searchString = req.body.search //input from searchbar
    let cat = (req.query.cat) ? req.query.cat : ""
    res.redirect("/?search=" + searchString.trim() + "&cat=" + cat);
  },

  logRequestData: (req, res, next) => {
    console.log("\n");
    console.log(req.url);
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    next();
  }
}