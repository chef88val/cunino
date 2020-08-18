'use strict';

import express from 'express'
import historyController from '../controllers/history'
import middle from '../middlewares/auth'
var api = express.Router();
/* GET home page. */
 
/*
api.get('/', middle.ensureAuth, historyController.getBocata)
api.get('/:id',middle.ensureAuth, historyController.getBocata)
api.post('/', historyController.updateBocata)
api.delete('/:id',middle.ensureAuth, historyController.deleteBocata)
api.put('/:id',middle.ensureAuth, historyController.updateBocata) */

export default api;