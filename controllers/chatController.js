"use strict";
module.exports = io => {
    console.log("1");
    io.on("connection", client => {
        console.log("new connection");

        client.on("disconnect", () => {
            console.log("user disconnected");
        });

        // 'message' event will now carry 'msg' data that client sends
        client.on("message", (msg) => {
            // emit the received message to all connected clients
            io.emit("message", {
                content: msg
            });
        });
    });
};
