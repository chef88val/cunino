'use strict';

var express = require('express');

var bocataRouter = require('../routes/item')
var pedidoRouter = require('../routes/pedido')
var userRouter = require('../routes/user')
var adminRouter = require('../routes/admin')
var app = express();
var api = express.Router();

var middle= require('../middlewares/auth') 

app.use('/item', bocataRouter)
app.use('/pedido', pedidoRouter)
app.use('/user', userRouter)
app.use('/admin', adminRouter)
module.exports = app;
/*

var bocataController = require('../controllers/item')
var pedidoController = require('../controllers/pedido')
var userController = require('../controllers/user')
api.get('/item',middle.ensureAuth, bocataController.getBocata)
api.get('/item/:id',middle.ensureAuth, bocataController.getBocata)
api.post('/item', bocataController.updateBocata)
api.delete('/item/:id',middle.ensureAuth, bocataController.deleteBocata)
api.put('/item/:id',middle.ensureAuth, bocataController.updateBocata)

api.get('/pedido',middle.ensureAuth, pedidoController.getPedido)
api.get('/pedido/:id',middle.ensureAuth, pedidoController.getPedido)
api.post('/pedido', pedidoController.savePedido)
api.delete('/pedido/:id',middle.ensureAuth, pedidoController.deletePedido)
api.put('/pedido/:id',middle.ensureAuth, pedidoController.updatePedido)

api.get('/user',middle.ensureAuth, userController.getUser)
api.get('/user/:id',middle.ensureAuth, userController.getUser)
api.post('/user', userController.saveUser)
api.delete('/user/:id',middle.ensureAuth, userController.deleteUser)
api.put('/user/:id',middle.ensureAuth, userController.updateUser)*/

//module.exports = api