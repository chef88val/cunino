"use strict";

var _moment = _interopRequireDefault(require("moment"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _os = _interopRequireDefault(require("os"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function stringToBoolean(val) {
  console.log(isNaN(val) + _typeof(val));

  try {
    if (isNaN(val)) return val == 'true';
  } catch (error) {}
}

function numberToBoolean(val) {
  console.log(isNaN(val) + _typeof(val));

  try {
    return parseInt(val) == 1;
  } catch (error) {}
}

function valueToBoolean(val) {
  console.log(isNaN(val) + _typeof(val));

  try {
    if (isNaN(val)) return val == 'true';else return parseInt(val) == 1;
  } catch (error) {}
}

function returnMomentFormat() {
  return (0, _moment["default"])().format("DD/MM/YYYY");
}

function makeMigration(type) {
  console.log('makeMigration');

  if (type == 'user') {
    var model = require('./models/user');

    model.updateMany({
      visible: true
    }, {
      $set: {
        profile: 'SF',
        role: 'User',
        notify: true
      }
    });
  }
}

'use strict';

var ifaces = _os["default"].networkInterfaces();

function getIPAddress() {
  var address = '';
  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;
    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log(ifname + ':' + alias, iface.address);
      } else {
        // this interface has only one ipv4 adress
        console.log(ifname, iface.address);
        address = iface.address;
      }

      ++alias;
    });
  });
  return address;
}

function getUsersPedido(users) {
  var res = [];
  users.forEach(function (element) {
    res.push(element.user.email);
  });
  return res;
}

module.exports = {
  stringToBoolean: stringToBoolean,
  numberToBoolean: numberToBoolean,
  valueToBoolean: valueToBoolean,
  returnMomentFormat: returnMomentFormat,
  makeMigration: makeMigration,
  getIPAddress: getIPAddress,
  getUsersPedido: getUsersPedido
};