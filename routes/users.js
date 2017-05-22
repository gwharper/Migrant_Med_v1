const express  = require('express');
const router   = express.Router();
const User     = require('../models/user');
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
    res.send('Auth');
});

// Protected Profile
router.get('/profile', (req, res, next) => {
    res.send('Profile');
});


module.exports = router;