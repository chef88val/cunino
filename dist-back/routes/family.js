'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _family = _interopRequireDefault(require("../controllers/family"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = _express["default"].Router();
/* 
api.get('/',middle.ensureAuth, familyController.getDelivery);
api.get('/:id',middle.ensureAuth, familyController.getDelivery);
api.post('/', familyController.saveDelivery);
api.delete('/:id',middle.ensureAuth, familyController.deleteDelivery);
api.put('/:id',middle.ensureAuth, familyController.updateDelivery);
api.put('/:id/items',middle.ensureAuth, familyController.updatePedidoBocatas);
api.put('/:id/:key/:value', middle.ensureAuthAdmin, familyController.updateStatusDelivery);*/


var _default = api;
exports["default"] = _default;