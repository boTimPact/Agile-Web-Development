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




/*exports.getAllProducts = (req, res, next) => {
  Product.find({}, (error, products) => {
    if(error) next(error);
    req.data = products;
    next();
  });
};*/
