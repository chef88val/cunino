'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _history = _interopRequireDefault(require("../controllers/history"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = _express["default"].Router();
/* GET home page. */

/*
api.get('/', middle.ensureAuth, historyController.getBocata)
api.get('/:id',middle.ensureAuth, historyController.getBocata)
api.post('/', historyController.updateBocata)
api.delete('/:id',middle.ensureAuth, historyController.deleteBocata)
api.put('/:id',middle.ensureAuth, historyController.updateBocata) */


var _default = api;
exports["default"] = _default;