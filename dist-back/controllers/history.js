"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _history2 = _interopRequireDefault(require("../models/history"));

var _mongoosePaginate = _interopRequireDefault(require("mongoose-paginate"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getHistory(req, res, next) {
  if (req.params.id) {
    try {
      _history2["default"].findById({
        _id: req.params.id,
        visible: true
      }, function (err, history) {
        console.log(err, history);
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!history || history.length < 1) return res.status(404).send({
          message: 'El history no existe'
        }); //if (history &&  history.length > 1)

        return res.status(200).send({
          history: history
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    console.log('2');

    try {
      console.log('22');
      res.send('History');

      _history2["default"].find({
        visible: true
      }, function (err, historys, total) {
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!historys) return res.status(404).send({
          message: 'No hay historys disponibles'
        }); //if (historys)

        return res.status(200).send({
          historys: historys
        }); //return res.status(200).send(historys)
      });
    } catch (error) {
      console.log('error');
      return res.status(500).send(error);
    }
  }
}

function updateHistory(req, res, next) {
  if (req.params.id) {
    try {
      var update = req.body;
      update.visible = true;

      _history2["default"].findByIdAndUpdate(req.params.id, update, {
        "new": true
      }, function (err, _history) {
        console.log('updateHistory', err);
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!_history) return res.status(404).send({
          message: 'No hay Historys disponibles'
        }); //if (_history) 

        return res.status(200).send({
          message: "History updated"
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    console.log('2');

    try {
      var history = new _history2["default"](req.body);

      _history2["default"].create(history, function (err, _history) {
        console.log(err, _history);
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!_history) return res.status(404).send({
          message: 'No hay Historys disponibles'
        });
        return res.status(200).send({
          message: "History created"
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}

function deleteHistory(req, res, next) {
  var historyId = req.params.id;
  var update = req.body;

  try {
    _history2["default"].findByIdAndUpdate(historyId, {
      visible: false
    }, function (err, _history) {
      if (err) return res.status(500).send({
        message: 'Error en la peticion'
      });
      if (!_history) return res.status(404).send({
        message: 'No hay Historys disponible'
      });
      return res.status(200).send({
        message: "History deleted"
      });
    });
  } catch (error) {
    return res.status(500).send(error);
  }
}

function saveHistory(history) {
  var res;

  var _history = new _history2["default"](history);

  try {
    _history2["default"].create(_history, {
      "new": true
    }, function (err, __history) {
      res = __history;
      /*  if (err) return err
        if (!_history) return null
        return _history*/
    });
  } catch (error) {
    return res.status(500).send(error);
  }

  console.log('res', res);
}

var _default = {
  getHistory: getHistory,
  deleteHistory: deleteHistory,
  updateHistory: updateHistory,
  saveHistory: saveHistory
};
exports["default"] = _default;