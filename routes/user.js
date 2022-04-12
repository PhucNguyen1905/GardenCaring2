const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const updateController = require('../controllers/updateController');
const auth = require('../config/auth')
const isLoggedIn = auth.isLoggedIn;

// Home view
route.get('/', userController.viewHome);

// Dashboard view
route.get('/index', isLoggedIn, userController.viewIndex);

// Temp and Moist view
route.get('/temp', isLoggedIn, userController.viewTemp);
route.get('/moist', isLoggedIn, userController.viewMoist);

// Device and limit view
route.get('/device', isLoggedIn, userController.viewDevice);
route.get('/limit', isLoggedIn, userController.viewLimit);
route.post('/limit/:type', userController.submitLimit);

// Login and Register
route.get('/login', authController.viewLogin);
route.post('/login', authController.login);
route.get('/logout', authController.logout);
route.get('/register', authController.viewRegister);
route.post('/register', authController.register);

//update table in db
route.post('/update', updateController.update); //chua su dung
route.post('/updateAll', updateController.updateAll);
route.get('/getTemp20', userController.getTemp20);
route.get('/getMoist20', userController.getMoist20)

module.exports = route;