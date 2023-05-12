"use strict";

exports.sendLoginPage = (req, res) => {
  // Dummy-Benutzer für Testzwecke
  const user = {
    name: "Test User",
    profilePicture: "../public/images/profile.PNG",
  };

  // Übergeben Sie 'user' auch hier
  res.render("login.ejs", { page: "Login", user: user });
};

exports.loginPost = (req, res) => {
  let username = req.body.username;
  //TODO: authenticate user
  //redirect to homepage
  const user = {
    name: username,
    profilePicture: "../public/images/profile.PNG",
  };
  // Übergeben Sie hier auch die Benutzerdaten
  res.redirect("./?user=" + username, { user: user });
};
