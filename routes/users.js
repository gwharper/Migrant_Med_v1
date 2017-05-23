const express  = require('express');
const router   = express.Router();
const User     = require('../models/user');
const config   = require('../config/database')
const passport = require('passport');
const jwt      = require('jsonwebtoken');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name:       req.body.name,
        username:   req.body.username,
        password:   req.body.password,
        phone:      req.body.phone,
        state:      req.body.state,
        city:       req.body.city,
        experience: req.body.experience,
        specialty:  req.body.specialty
    });

    User.addUser(newUser, (err, user) => {
      if(err) {
          res.json({success: false, message: 'User could not be created' + err});
      } else {
          res.json({success: true, message: 'User created successfully!'});
      }
    })
});

// Authenticate
router.post('/auth', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success: false, message: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) =>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user, config.secret,{
                    expiresIn: 604800 //1 week
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        phone: user.phone,
                        state: user.state,
                        city: user.city,
                        experience: user.experience,
                        specialty: user.specialty
                    }
                })
            } else {
                return res.json({success: false, message: 'invalid email and password combination please try again'});
            }
        })
    })
});

// Protected Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});


module.exports = router;