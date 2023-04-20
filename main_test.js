"use strict";

const port = 3000,
http = require("http"),
httpStatus = require("http-status-codes"),
fs = require("fs"),
app = http.createServer();

/*
app.on("request", (req, res) => {
    res.writeHead(httpStatus.OK, {"Content-Type": "text/html"});
    console.log(`Method: ${getJSONString(req.method)}`);
    console.log(`URL: ${getJSONString(req.url)}`);
    console.log(`Header: ${getJSONString(req.headers)}`);
    let responseMessage = "<h1>Message!</h1>";
    res.end(responseMessage);
});
*/

/*
app.on("request", (req, res) => {
    var body = [];
    req.on("data", bodyData => {
        body.push(bodyData);
    });
    req.on("end", () => {
        body = Buffer.concat(body).toString();
        console.log(`Request Body Contents: ${body}`);
    });

    console.log(`Method: ${getJSONString(req.method)}`);
    console.log(`URL: ${getJSONString(req.url)}`);
    console.log(`Header: ${getJSONString(req.headers)}`);

    res.writeHead(httpStatus.OK, {"Content-Type": "text/html"});
    let responseMessage = "<h1>Message!</h1>";
    res.end(responseMessage);
});
*/

/*
app.on("request", (req, res) => {
    res.writeHead(httpStatus.OK, {"Content-Type": "text/html"});
    console.log(`Method: ${getJSONString(req.method)}`);
    console.log(`URL: ${getJSONString(req.url)}`);
    console.log(`Header: ${getJSONString(req.headers)}`);
    if(routeResponseMap[req.url]){
        //simulate heavy processing or delay
        //setTimeout(() => res.end(routeResponseMap[req.url]), 2000);
        //res.end(routeResponseMap[req.url]);
        fs.readFile(routeResponseMap[req.url],  (error, data) => {
            res.write(data);
            res.end();
        })
    }else{
        res.end("<h1>Sorry not found!</h1>");
    }
});
*/

/*
app.on("request", (req, res) => {
    let viewUrl = getViewUrl(req.url);
    console.log(`Method: ${getJSONString(req.method)}`);
    console.log(`URL: ${getJSONString(req.url)}`);
    console.log(`Header: ${getJSONString(req.headers)}`);
    fs.readFile(viewUrl, (error, data) => {
        if(error){
            res.writeHead(httpStatus.NOT_FOUND);
            res.write("<h1>File not found!</h1>");
        }else{
            res.writeHead(httpStatus.OK, {"Content-Type": "text/html"});
            res.write(data);
        }
        res.end();
    });
});
*/

app.on("request", (req, res) => {
    console.log(`Method: ${getJSONString(req.method)}`);
    console.log(`URL: ${getJSONString(req.url)}`);
    console.log(`Header: ${getJSONString(req.headers)}`);
    
    let url = req.url;
    if(url.indexOf(".html" !== -1)){
        
    }
});


app.listen(port);
console.log(`The server has started listening on port number: ${port}`);

const getJSONString = obj => {
    return JSON.stringify(obj, null, 2);
}

/*
const getViewUrl = (url) => {
    return `views${url}.html`;
}
*/

const routeResponseMap = {
    "/": "views/Home Page/index.html",
    "/expanse": "views/Expanse Website/index.html",
    "/contact": "<p>Please leave a message</p>"
};