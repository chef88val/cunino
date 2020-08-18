'use strict';

import express from 'express';
import familyController from '../controllers/family';
import middle from '../middlewares/auth';

var api = express.Router();

/* 
api.get('/',middle.ensureAuth, familyController.getDelivery);
api.get('/:id',middle.ensureAuth, familyController.getDelivery);
api.post('/', familyController.saveDelivery);
api.delete('/:id',middle.ensureAuth, familyController.deleteDelivery);
api.put('/:id',middle.ensureAuth, familyController.updateDelivery);
api.put('/:id/items',middle.ensureAuth, familyController.updatePedidoBocatas);
api.put('/:id/:key/:value', middle.ensureAuthAdmin, familyController.updateStatusDelivery);*/

export default api;