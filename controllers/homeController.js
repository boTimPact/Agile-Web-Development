const homeController = require("./homeController");
//Move your route callback functions to the home controller, and add them to that module’s exports object.

exports.sendHomePage = (req, res) => {
    res.send("hallo");
}