const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Dashboard view
route.get('/', userController.viewIndex);

// Temp and Moist view
route.get('/temp', userController.viewTemp);
route.get('/moist', userController.viewMoist);

// Device and limit view
route.get('/device', userController.viewDevice);
route.get('/limit', userController.viewLimit);


// Login and Register
route.get('/login', authController.viewLogin);
route.get('/register', authController.viewRegister);

module.exports = route;