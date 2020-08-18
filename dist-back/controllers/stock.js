"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _stock2 = _interopRequireDefault(require("../models/stock"));

var _mongoosePaginate = _interopRequireDefault(require("mongoose-paginate"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getStock(req, res, next) {
  if (req.params.id) {
    try {
      _stock2["default"].findById({
        _id: req.params.id,
        visible: true
      }, function (err, stock) {
        console.log(err, stock);
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!stock || stock.length < 1) return res.status(404).send({
          message: 'El stock no existe'
        }); //if (stock &&  stock.length > 1)

        return res.status(200).send({
          stock: stock
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    console.log('2');

    try {
      console.log('22');
      res.send('Stock');

      _stock2["default"].find({
        visible: true
      }, function (err, stocks, total) {
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!stocks) return res.status(404).send({
          message: 'No hay stocks disponibles'
        }); //if (stocks)

        return res.status(200).send({
          stocks: stocks
        }); //return res.status(200).send(stocks)
      });
    } catch (error) {
      console.log('error');
      return res.status(500).send(error);
    }
  }
}

function updateStock(req, res, next) {
  if (req.params.id) {
    try {
      var update = req.body;
      update.visible = true;

      _stock2["default"].findByIdAndUpdate(req.params.id, update, {
        "new": true
      }, function (err, _stock) {
        console.log('updateStock', err);
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!_stock) return res.status(404).send({
          message: 'No hay Stocks disponibles'
        }); //if (_stock) 

        return res.status(200).send({
          message: "Stock updated"
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    console.log('2');

    try {
      var stock = new _stock2["default"](req.body);

      _stock2["default"].create(stock, function (err, _stock) {
        console.log(err, _stock);
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!_stock) return res.status(404).send({
          message: 'No hay Stocks disponibles'
        });
        return res.status(200).send({
          message: "Stock created"
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}

function deleteStock(req, res, next) {
  var stockId = req.params.id;
  var update = req.body;

  try {
    _stock2["default"].findByIdAndUpdate(stockId, {
      visible: false
    }, function (err, _stock) {
      if (err) return res.status(500).send({
        message: 'Error en la peticion'
      });
      if (!_stock) return res.status(404).send({
        message: 'No hay Stocks disponible'
      });
      return res.status(200).send({
        message: "Stock deleted"
      });
    });
  } catch (error) {
    return res.status(500).send(error);
  }
}

function saveStock(stock) {
  var res;

  var _stock = new _stock2["default"](stock);

  try {
    _stock2["default"].create(_stock, {
      "new": true
    }, function (err, __stock) {
      res = __stock;
      /*  if (err) return err
        if (!_stock) return null
        return _stock*/
    });
  } catch (error) {
    return res.status(500).send(error);
  }

  console.log('res', res);
}

var _default = {
  getStock: getStock,
  deleteStock: deleteStock,
  updateStock: updateStock,
  saveStock: saveStock
};
exports["default"] = _default;