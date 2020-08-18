'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _delivery = _interopRequireDefault(require("../controllers/delivery"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = _express["default"].Router();
/*
api.get('/',middle.ensureAuth, deliveryController.getPedido);
api.get('/:id',middle.ensureAuth, deliveryController.getPedido);
api.post('/', deliveryController.savePedido);
api.delete('/:id',middle.ensureAuth, deliveryController.deletePedido);
api.put('/:id',middle.ensureAuth, deliveryController.updatePedido);
api.put('/:id/items',middle.ensureAuth, deliveryController.updatePedidoBocatas);
api.put('/:id/:key/:value', middle.ensureAuthAdmin, deliveryController.updateStatusPedido);*/


var _default = api;
exports["default"] = _default;