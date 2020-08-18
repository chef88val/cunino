import express from 'express'

import userController from '../controllers/user'
import middle from '../middlewares/auth'
var api = express.Router();


/* GET users listing. */
api.get('/index', function(req, res, next) {
  res.send('respond with a resource');
});

api.get('/',middle.ensureAuth, userController.getUser);
api.get('/:id',middle.ensureAuth, userController.getUser);
api.post('/', userController.getLoginUser);
api.delete('/:id',middle.ensureAuth, userController.deleteUser);
api.post('/new',middle.ensureAuth, userController.updateUser);
api.put('/:id',middle.ensureAuth, userController.updateUser);
api.put('/:id/:key/:value', middle.ensureAuthAdmin, userController.updateKeyUser);


export default api;
