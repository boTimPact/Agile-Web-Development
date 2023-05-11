const mongoose = require("mongoose"),
    userSchema = mongoose.Schema({
        user_id: Number,
        username: String,
        password: String,
        email: String,
        address: String,
    });
module.exports = mongoose.model("User", userSchema);