const express = require('express');
const router = express.Router();

// @route GET/api/auth
// @desc GET logged in user
// @access private
router.get('/', (req, res) => {
    res.send('Get logged in user')
});

// @route GET/api/auth
// @desc Auth the user
// @access Public
router.get('/', (req, res) => {
    res.send('Log in user')
});


module.exports = router;