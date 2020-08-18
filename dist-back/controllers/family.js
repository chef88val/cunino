"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _family2 = _interopRequireDefault(require("../models/family"));

var _mongoosePaginate = _interopRequireDefault(require("mongoose-paginate"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getFamily(req, res, next) {
  if (req.params.id) {
    try {
      _family2["default"].findById({
        _id: req.params.id,
        visible: true
      }, function (err, family) {
        console.log(err, family);
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!family || family.length < 1) return res.status(404).send({
          message: 'El family no existe'
        }); //if (family &&  family.length > 1)

        return res.status(200).send({
          family: family
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    console.log('2');

    try {
      console.log('22');
      res.send('Family');

      _family2["default"].find({
        visible: true
      }, function (err, familys, total) {
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!familys) return res.status(404).send({
          message: 'No hay familys disponibles'
        }); //if (familys)

        return res.status(200).send({
          familys: familys
        }); //return res.status(200).send(familys)
      });
    } catch (error) {
      console.log('error');
      return res.status(500).send(error);
    }
  }
}

function updateFamily(req, res, next) {
  if (req.params.id) {
    try {
      var update = req.body;
      update.visible = true;

      _family2["default"].findByIdAndUpdate(req.params.id, update, {
        "new": true
      }, function (err, _family) {
        console.log('updateFamily', err);
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!_family) return res.status(404).send({
          message: 'No hay Familys disponibles'
        }); //if (_family) 

        return res.status(200).send({
          message: "Family updated"
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    console.log('2');

    try {
      var family = new _family2["default"](req.body);

      _family2["default"].create(family, function (err, _family) {
        console.log(err, _family);
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!_family) return res.status(404).send({
          message: 'No hay Familys disponibles'
        });
        return res.status(200).send({
          message: "Family created"
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}

function deleteFamily(req, res, next) {
  var familyId = req.params.id;
  var update = req.body;

  try {
    _family2["default"].findByIdAndUpdate(familyId, {
      visible: false
    }, function (err, _family) {
      if (err) return res.status(500).send({
        message: 'Error en la peticion'
      });
      if (!_family) return res.status(404).send({
        message: 'No hay Familys disponible'
      });
      return res.status(200).send({
        message: "Family deleted"
      });
    });
  } catch (error) {
    return res.status(500).send(error);
  }
}

function saveFamily(family) {
  var res;

  var _family = new _family2["default"](family);

  try {
    _family2["default"].create(_family, {
      "new": true
    }, function (err, __family) {
      res = __family;
      /*  if (err) return err
        if (!_family) return null
        return _family*/
    });
  } catch (error) {
    return res.status(500).send(error);
  }

  console.log('res', res);
}

var _default = {
  getFamily: getFamily,
  deleteFamily: deleteFamily,
  updateFamily: updateFamily,
  saveFamily: saveFamily
};
exports["default"] = _default;