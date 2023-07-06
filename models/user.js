const randToken = require ("rand-token");
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose"),
    userSchema = mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: [true, "This username is already in use!"]
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        address: {
            type: String
        },
        /*apiToken: {
            type: String
        }*/
    });
/*userSchema.pre("save", function (next) {
    let user = this;
    if (!user.apiToken) user.apiToken = randToken.generate(16);
    next();
});*/

userSchema.plugin(passportLocalMongoose, {
    usernameField: "username"
});

module.exports = mongoose.model('User', userSchema);