const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');
const { check, validationResult } = require('express-validator');

// @route   POST/api/users
// @desc    Register a user
// @access  Public
router.post('/', [
    check('name', 'Please add name')
    .not()
    .isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({ min: 6 })
],
// To use await you must mark your function as async
 async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    // find user with given email
    try {
        let user = await User.findOne({ email });
     // If user already exists send user already exists message
        if(user) {
            return res.status(400).json({ msg: 'User already exists'});
        }
    // This creates new instance of a user
        user = new User({
            name,
            email,
            password
        });

        // This bcrypts the password
        const salt = await bcrypt.genSalt(10)

        // We use await infront of the methods returning promise
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        // To generate a token we have to sign in
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;