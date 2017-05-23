const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const config   = require('../config/database');


// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type:     String,
        required: true
    },
    username: {
        type:     String,
        required: true
     },
    password: {
        type:     String,
        required: true
    },
    email: {
        type:     String,
        required: true
    },
    phone: {
        type:     String,
        required: true
    },
    state: {
        type:     String,
        required: true
    },
    city: {
        type:     String,
        required: true
    },
    experience: {
        type:     String,
        required: true
    },
    specialty: {
        type:     String,
        required: true
    },
    wages: {
        type:     String,
        required:  true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};
module.exports.getUserByUsername = function (username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        if(err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
           newUser.password = hash;
           newUser.save(callback);
        });
    });
};


module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    })
};


