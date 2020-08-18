'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _stock = _interopRequireDefault(require("../controllers/stock"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = _express["default"].Router();
/* 
api.get('/',middle.ensureAuth, stockController.getPedido);
api.get('/:id',middle.ensureAuth, stockController.getPedido);
api.post('/', stockController.savePedido);
api.delete('/:id',middle.ensureAuth, stockController.deletePedido);
api.put('/:id',middle.ensureAuth, stockController.updatePedido);
api.put('/:id/items',middle.ensureAuth, stockController.updatePedidoBocatas);
api.put('/:id/:key/:value', middle.ensureAuthAdmin, stockController.updateStatusPedido);*/


var _default = api;
exports["default"] = _default;