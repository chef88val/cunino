'use strict';

import express from 'express';
import deliveryController from '../controllers/delivery';
import middle from '../middlewares/auth';

var api = express.Router();

/*
api.get('/',middle.ensureAuth, deliveryController.getPedido);
api.get('/:id',middle.ensureAuth, deliveryController.getPedido);
api.post('/', deliveryController.savePedido);
api.delete('/:id',middle.ensureAuth, deliveryController.deletePedido);
api.put('/:id',middle.ensureAuth, deliveryController.updatePedido);
api.put('/:id/items',middle.ensureAuth, deliveryController.updatePedidoBocatas);
api.put('/:id/:key/:value', middle.ensureAuthAdmin, deliveryController.updateStatusPedido);*/

export default api;