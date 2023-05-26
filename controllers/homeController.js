"use strict";

exports.sendHomePage = (req, res) => {
    if (req.query.user != null && req.query.user != undefined) {
        let user = {
            name: req.query.user,
            profilePicture: "../public/images/profile.PNG", // This should be the actual path to the user's profile picture
        };
        let viewParameter = { loggedIn: true, user: user, page: "Home" }
        res.render("index.ejs", viewParameter)
    } else {
        let viewParameter = { loggedIn: false, page: "Home" }
        res.render("index.ejs", viewParameter)
    }

}

exports.homePost = (req, res) => {
  res.send("POST Successful!");
};

exports.logRequestData = (req, res, next) => {
  console.log("\n");
  console.log(req.url);
  console.log(req.body);
  console.log(req.params);
  console.log(req.query);
  next();
};

const Product = require("../models/product");
const { getAllProducts } = require("./productController");
exports.getAllProducts = (req, res) => {
  Product.find({})
          .exec()
          .then((products) => {    
              console.log(products);
              //res.send(product);
              res.render("index", {
                  products: products     //kommt nicht bei index an..... 
              });
          })
          .catch((error) => {
              console.log(error.message);
              return [];
          })
          .then(() => {
              console.log("promise complete");
          })

}


/*exports.getAllProducts = (req, res, next) => {
  Product.find({}, (error, products) => {
    if(error) next(error);
    req.data = products;
    next();
  });
};*/
