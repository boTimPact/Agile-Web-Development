"use strict";

const port = 3000,
http = require("http"),
httpStatus = require("http-status-codes"),
router = require("./router"),
contentTypes = require("./contentTypes"),
utils = require("./utils");


router.get("/", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/index.html", res);
});
router.get("/expanse", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/expanse.html", res);
})
router.get("/expanse/css", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.css);
    utils.getFile("./public/css/expanse.css", res);
});
router.get("/expanse/js", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.js);
    utils.getFile("./public/js/expanse.js", res);
})

http.createServer(router.handle).listen(port);
console.log(`The server has started listening on port number: ${port}`);

const getJSONString = obj => {
    return JSON.stringify(obj, null, 2);
}

const routeResponseMap = {
    "/": "views/Home Page/index.html",
    "/expanse": "views/Expanse Website/index.html",
    "/contact": "<p>Please leave a message</p>"
};