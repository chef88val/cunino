"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _admin = _interopRequireDefault(require("../controllers/admin"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = _express["default"].Router();
/* GET users listing. */


api.get('/index', function (req, res, next) {
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

var _default = api;
exports["default"] = _default;