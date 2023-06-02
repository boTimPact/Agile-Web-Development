const mongoose = require("mongoose"),
    userSchema = mongoose.Schema({
        user_id: String,
        username: {
            type: String,
            required: true,
            unique: [true, "This username is already in use!"]
        },
        password: {
            type: String,
            min: 4,
            required: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        address: {
            type: String
        }
    });
module.exports = mongoose.model('User', userSchema);