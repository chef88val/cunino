"use strict";

var _delivery2 = _interopRequireDefault(require("../models/delivery"));

var _user2 = _interopRequireDefault(require("../models/user"));

var _mongoosePaginate = _interopRequireDefault(require("mongoose-paginate"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _moment = _interopRequireDefault(require("moment"));

var _utils = _interopRequireDefault(require("../utils"));

var _sendemails = _interopRequireDefault(require("../sendemails"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getDelivery(req, res, next) {
  if (req.params.id) {
    try {
      _delivery2["default"].find({
        _id: req.params.id,
        visible: true,
        title: _utils["default"].returnMomentFormat()
      }).populate('users.user').populate('users.item').populate('items.user').populate('items.items').populate('items.item').populate('items').populate('caller').exec(function (err, delivery) {
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!delivery || delivery.length < 1) return res.status(404).send({
          message: 'El delivery no existe'
        }); //if (delivery &&  delivery.length > 1)

        return res.status(200).send({
          delivery: delivery
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    try {
      _delivery2["default"].findOne({
        visible: true,
        title: _utils["default"].returnMomentFormat()
      }).populate('users.user').populate('users.item').populate('items.user').populate('items.items').populate('items.item').populate('items').populate('caller').exec(function (err, delivery) {
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!delivery || delivery.length < 1) return res.status(404).send({
          message: 'El delivery no existe'
        }); //if (delivery &&  delivery.length > 1)

        return res.status(200).send(delivery);
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
} //function saveDelivery(req, res, next) {


function saveDelivery(user) {
  var deliveryOK;
  var delivery = new _delivery2["default"]({
    title: _utils["default"].returnMomentFormat(),
    items: [],
    users: [],
    caller: user,
    author: 'system',
    status: 'draft',
    pubDate: (0, _moment["default"])(),
    visible: true
  });
  console.log('delivery', delivery);

  try {
    delivery.save(function (err, _delivery) {
      console.log('_delivery', _delivery);
      console.log('err', err);
    });
    user.lastCall = (0, _moment["default"])().format();
    var update = user.lastCall; //user = new User(user);

    _user2["default"].findByIdAndUpdate(user._id, {
      $set: {
        lastCall: update
      }
    }, function (err, _user) {});
  } catch (error) {
    return error;
    /*res.status(200).send({
                message: error.errors.size.ValidatorError
            })*/
  }

  return deliveryOK;
}

function updateDelivery(req, res, next) {
  if (req.params.id) {
    try {
      console.log('before', _typeof(req.body.extras));
      req.body.extras = req.body.extras.split(', ');
      req.body.extras = req.body.extras.map(function (x) {
        return x.toLowerCase();
      });
      console.log('after', req.body.extras);
      var update = req.body;

      _delivery2["default"].findByIdAndUpdate(req.params.id, //update, 
      {
        $push: {
          users: update
        }
      }, function (err, _delivery) {
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!_delivery) return res.status(404).send({
          message: 'No hay Deliverys disponibles'
        }); //if (_delivery) 

        return res.status(200).send({
          message: "Delivery updated"
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}

function updateDeliveryBocatas(req, res, next) {
  if (req.params.id) {
    try {
      var update = req.body;

      _delivery2["default"].findByIdAndUpdate(req.params.id, //update, 
      {
        $push: {
          items: update
        },
        status: 'consultado'
      }, function (err, _delivery) {
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!_delivery) return res.status(404).send({
          message: 'No hay Deliverys disponibles'
        }); //if (_delivery) 

        return res.status(200).send({
          message: "Delivery updated"
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}

function deleteDelivery(req, res, next) {
  try {
    _delivery2["default"].findByIdAndUpdate(req.params.id, {
      visible: false
    }, function (err, _delivery) {
      if (err) return res.status(500).send({
        message: 'Error en la peticion'
      });
      if (!_delivery) return res.status(404).send({
        message: 'No hay Feeds disponible'
      });
      return res.status(200).send({
        message: "Feed deleted"
      });
    });
  } catch (error) {
    return res.status(500).send(error);
  }
}

function updateStatusDelivery(req, res, next) {
  var key = req.params.key;
  var delivery = {};
  delivery[key] = req.params.value;

  try {
    _delivery2["default"].findByIdAndUpdate(req.params.id, delivery).exec(function (err, _delivery) {
      console.log(_delivery, 'updateDelivery', err);
      if (err) return res.status(500).send({
        message: 'Error en la peticion'
      });
      if (!_delivery) return res.status(404).send({
        message: 'No hay Deliverys disponibles'
      });

      if (_delivery) {
        _sendemails["default"].sendStatusEmail(_delivery, _utils["default"].getUsersDelivery(_delivery.users));

        return res.status(200).send({
          message: "Delivery updated"
        });
      }
    });
  } catch (error) {
    console.log('asdasd');
    return res.status(500).send(error);
  } //next();

}

module.exports = {
  getDelivery: getDelivery,
  saveDelivery: saveDelivery,
  deleteDelivery: deleteDelivery,
  updateDelivery: updateDelivery,
  updateDeliveryBocatas: updateDeliveryBocatas,
  updateStatusDelivery: updateStatusDelivery
};