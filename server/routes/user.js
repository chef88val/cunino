'use strict';

var express = require('express');
var userController = require('../controllers/user');

var api = express.Router();

var middle= require('../middlewares/auth');

api.get('/',middle.ensureAuth, userController.getUser);
api.get('/:id',middle.ensureAuth, userController.getUser);
api.post('/', userController.getLoginUser);
api.delete('/:id',middle.ensureAuth, userController.deleteUser);
api.post('/new',middle.ensureAuth, userController.updateUser);
api.put('/:id',middle.ensureAuth, userController.updateUser);
api.put('/:id/:key/:value', middle.ensureAuthAdmin, userController.updateKeyUser);

module.exports = api