"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../controllers/user"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = _express["default"].Router();
/* GET users listing. */


api.get('/index', function (req, res, next) {
  res.send('respond with a resource');
});
api.get('/', _auth["default"].ensureAuth, _user["default"].getUser);
api.get('/:id', _auth["default"].ensureAuth, _user["default"].getUser);
api.post('/', _user["default"].getLoginUser);
api["delete"]('/:id', _auth["default"].ensureAuth, _user["default"].deleteUser);
api.post('/new', _auth["default"].ensureAuth, _user["default"].updateUser);
api.put('/:id', _auth["default"].ensureAuth, _user["default"].updateUser);
api.put('/:id/:key/:value', _auth["default"].ensureAuthAdmin, _user["default"].updateKeyUser);
var _default = api;
exports["default"] = _default;