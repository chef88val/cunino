'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongodb = require("mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;

var _default = _mongoose["default"].model('CASHFLOW', Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
  },
  visible: {
    type: Boolean,
    "default": true
  },
  value: {
    type: _mongodb.Decimal128,
    "default": true
  },
  datevalue: {
    type: Date,
    "default": Date.now()
  },
  timevalue: {
    type: Date,
    "default": Date.now()
  },
  CreatedBy: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'USER'
  },
  CreatedDate: {
    type: Date,
    "default": Date.now()
  }
}));

exports["default"] = _default;