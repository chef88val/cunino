import express from 'express'

import cashflowController from '../controllers/cashflow'
import middle from '../middlewares/auth'
var api = express.Router();


/* GET users listing. */
api.get('/index', function(req, res, next) {
  res.send('respond with a resource');
});
/*
api.get('/',middle.ensureAuth, cashflowController.getUser);
api.get('/:id',middle.ensureAuth, cashflowController.getUser);
api.post('/', cashflowController.getLoginUser);
api.delete('/:id',middle.ensureAuth, cashflowController.deleteUser);
api.post('/new',middle.ensureAuth, cashflowController.updateUser);
api.put('/:id',middle.ensureAuth, cashflowController.updateUser);
api.put('/:id/:key/:value', middle.ensureAuthAdmin, cashflowController.updateKeyUser);*/


export default api;
