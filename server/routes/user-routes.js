const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('../models/http-error');
const userControllers = require('../controllers/users');

const router = express.Router();

router.get('/:uid', userControllers.getUsers)

router.post('/signup', userControllers.signup)

router.post('/login', userControllers.login)

module.exports = router;



