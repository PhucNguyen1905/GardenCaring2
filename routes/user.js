const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const updateController = require('../controllers/updateController');

// Dashboard view
route.get('/', userController.viewIndex);

// Temp and Moist view
route.get('/temp', userController.viewTemp);
route.get('/moist', userController.viewMoist);

// Device and limit view
route.get('/device', userController.viewDevice);
route.get('/limit', userController.viewLimit);
route.post('/limit/:type', userController.submitLimit);


// Login and Register
route.get('/login', authController.viewLogin);
route.get('/register', authController.viewRegister);

//update table in db
route.post('/update', updateController.update); //chua su dung
route.post('/updateAll', updateController.updateAll);

module.exports = route;