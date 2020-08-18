'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongodb = require("mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;

var _default = _mongoose["default"].model('DELIVERY', Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    dropDups: true
  },

  /*users: [{
      item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'ITEM'
      },
      size: {
          type: String,
          enum: ['p', 'g']
      },
      extras:[{type: String}],
      user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'USER'
      }
      
  }],*/
  items: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'ITEM'
  }],
  priceDelivery: {
    type: _mongodb.Decimal128,
    "default": true
  },
  qty: {
    type: Number,
    "default": true
  }
  /*author: {type:String, default:'system'},
  status: {type:String, default:'draft'},
  caller: {type:mongoose.Schema.Types.ObjectId, ref: 'USER'},
  pubDate: Date,
  visible: {type:Boolean, default:true}*/

}));

exports["default"] = _default;