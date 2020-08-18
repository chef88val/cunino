'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongodb = require("mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;

var _default = _mongoose["default"].model('HISTORY', Schema({
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
  price: {
    type: _mongodb.Decimal128,
    "default": true
  },
  family: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'USER'
  }
})); //module.exports = mongoose.model('ITEM', itemSchema)


exports["default"] = _default;