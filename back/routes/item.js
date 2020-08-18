'use strict';

import express from 'express'
import itemController from '../controllers/item'
import middle from '../middlewares/auth'
var api = express.Router(); 
/*
api.get('/', middle.ensureAuth, itemController.getItem)
api.get('/:id',middle.ensureAuth, itemController.getItem)
api.post('/', itemController.updateItem)
api.delete('/:id',middle.ensureAuth, itemController.deleteItem)
api.put('/:id',middle.ensureAuth, itemController.updateItem)*/

export default api;