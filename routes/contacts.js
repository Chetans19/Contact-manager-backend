const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');


// @route GET/api/contacts
// @desc Get all user contacts
// @access Private
// Adding second parameter as auth makes it protected
router.get('/', auth, (req, res) => {
    res.send('Get all contacts')
});

// @route POSt/api/contacts
// @desc Add new contact
// @access Private
router.post('/', (req, res) => {
    res.send('Add new contact')
});

// @route PUT/api/contacts/:id
// @desc Update contact
// @access Private
router.put('/:id', (req, res) => {
    res.send('Update contact')
});

// @route DELETE/api/contacts/:id
// @desc Delete contact
// @access Private
router.delete('/:id', (req, res) => {
    res.send('delete contact')
});

module.exports = router;
