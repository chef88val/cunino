"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cashflow = _interopRequireDefault(require("../controllers/cashflow"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = _express["default"].Router();
/* GET users listing. */


api.get('/index', function (req, res, next) {
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

var _default = api;
exports["default"] = _default;