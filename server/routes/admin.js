'use strict';

var express = require('express');
var adminController = require('../controllers/admin')

var api = express.Router();

var middle= require('../middlewares/auth') 

api.post('/password/:password',middle.ensureAuthAdmin, adminController.getPassword) 
api.get('/data',middle.ensureAuth, adminController.getData) 
//api.post('/user/:id/notify/:new', middle.ensureAuthAdmin, adminController.changeNotifyUser );

module.exports = api