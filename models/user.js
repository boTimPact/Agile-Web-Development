//const bcrypt = require("bcrypt")
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose"),
    userSchema = mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: [true, "This username is already in use!"]
        },
        /*password: {
            type: String,
            min: 4,
            required: true
        },*/
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
/*userSchema.pre("save", function (next) {
    let user = this;

    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash;
        next();
    })
        .catch(err => {
            console.log(err);
            next(err);
        });
});

userSchema.methods.passwordComparison = function (password) {
    let user = this;
    return bcrypt.compare(password, user.password);
};*/

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

module.exports = mongoose.model('User', userSchema);