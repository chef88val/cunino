'use strict';

import express from 'express';
import stockController from '../controllers/stock';
import middle from '../middlewares/auth';

var api = express.Router();

/* 
api.get('/',middle.ensureAuth, stockController.getPedido);
api.get('/:id',middle.ensureAuth, stockController.getPedido);
api.post('/', stockController.savePedido);
api.delete('/:id',middle.ensureAuth, stockController.deletePedido);
api.put('/:id',middle.ensureAuth, stockController.updatePedido);
api.put('/:id/items',middle.ensureAuth, stockController.updatePedidoBocatas);
api.put('/:id/:key/:value', middle.ensureAuthAdmin, stockController.updateStatusPedido);*/

export default api;