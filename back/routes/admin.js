import express from 'express'

import adminController from '../controllers/admin'
import middle from '../middlewares/auth'
var api = express.Router();


/* GET users listing. */
api.get('/index', function(req, res, next) {
  res.send('respond with a resource');
});
/*
api.get('/',middle.ensureAuth, adminController.getUser);
api.get('/:id',middle.ensureAuth, adminController.getUser);
api.post('/', adminController.getLoginUser);
api.delete('/:id',middle.ensureAuth, adminController.deleteUser);
api.post('/new',middle.ensureAuth, adminController.updateUser);
api.put('/:id',middle.ensureAuth, adminController.updateUser);
api.put('/:id/:key/:value', middle.ensureAuthAdmin, adminController.updateKeyUser);*/


export default api;
