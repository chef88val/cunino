'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;

var _default = _mongoose["default"].model('USER', Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
  },
  money: {
    type: Number,
    "default": 0
  },
  lastCall: Date,
  profile: {
    type: String,
    "enum": ['SF'],
    "default": 'SF'
  },
  role: {
    type: String,
    "enum": ['user', 'admin', 'caller']
  },
  notify: {
    type: Boolean,
    "default": true
  },
  visible: {
    type: Boolean,
    "default": true
  },
  password: {
    type: String,
    select: false
  }
}));

exports["default"] = _default;