"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _item2 = _interopRequireDefault(require("../models/item"));

var _mongoosePaginate = _interopRequireDefault(require("mongoose-paginate"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getItem(req, res, next) {
  if (req.params.id) {
    try {
      _item2["default"].findById({
        _id: req.params.id,
        visible: true
      }, function (err, item) {
        console.log(err, item);
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!item || item.length < 1) return res.status(404).send({
          message: 'El item no existe'
        }); //if (item &&  item.length > 1)

        return res.status(200).send({
          item: item
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    console.log('2');

    try {
      console.log('22');
      res.send('Item');

      _item2["default"].find({
        visible: true
      }, function (err, items, total) {
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!items) return res.status(404).send({
          message: 'No hay items disponibles'
        }); //if (items)

        return res.status(200).send({
          items: items
        }); //return res.status(200).send(items)
      });
    } catch (error) {
      console.log('error');
      return res.status(500).send(error);
    }
  }
}

function updateItem(req, res, next) {
  if (req.params.id) {
    try {
      var update = req.body;
      update.visible = true;

      _item2["default"].findByIdAndUpdate(req.params.id, update, {
        "new": true
      }, function (err, _item) {
        console.log('updateItem', err);
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!_item) return res.status(404).send({
          message: 'No hay Items disponibles'
        }); //if (_item) 

        return res.status(200).send({
          message: "Item updated"
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    console.log('2');

    try {
      var item = new _item2["default"](req.body);

      _item2["default"].create(item, function (err, _item) {
        console.log(err, _item);
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!_item) return res.status(404).send({
          message: 'No hay Items disponibles'
        });
        return res.status(200).send({
          message: "Item created"
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}

function deleteItem(req, res, next) {
  var itemId = req.params.id;
  var update = req.body;

  try {
    _item2["default"].findByIdAndUpdate(itemId, {
      visible: false
    }, function (err, _item) {
      if (err) return res.status(500).send({
        message: 'Error en la peticion'
      });
      if (!_item) return res.status(404).send({
        message: 'No hay Items disponible'
      });
      return res.status(200).send({
        message: "Item deleted"
      });
    });
  } catch (error) {
    return res.status(500).send(error);
  }
}

function saveItem(item) {
  var res;

  var _item = new _item2["default"](item);

  try {
    _item2["default"].create(_item, {
      "new": true
    }, function (err, __item) {
      res = __item;
      /*  if (err) return err
        if (!_item) return null
        return _item*/
    });
  } catch (error) {
    return res.status(500).send(error);
  }

  console.log('res', res);
}

var _default = {
  getItem: getItem,
  deleteItem: deleteItem,
  updateItem: updateItem,
  saveItem: saveItem
};
exports["default"] = _default;