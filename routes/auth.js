const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const authController = require('../controllers/auth');
//const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.put(
    '/signup',
    authController.signup
  );

router.post('/signin', authController.signin);

router.post('/getUser', authController.getUser);


module.exports = router;