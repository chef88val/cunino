'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _item = _interopRequireDefault(require("../controllers/item"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = _express["default"].Router();
/*
api.get('/', middle.ensureAuth, itemController.getItem)
api.get('/:id',middle.ensureAuth, itemController.getItem)
api.post('/', itemController.updateItem)
api.delete('/:id',middle.ensureAuth, itemController.deleteItem)
api.put('/:id',middle.ensureAuth, itemController.updateItem)*/


var _default = api;
exports["default"] = _default;