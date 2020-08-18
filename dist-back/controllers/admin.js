"use strict";

var _admin2 = _interopRequireDefault(require("../models/admin"));

var _mongoosePaginate = _interopRequireDefault(require("mongoose-paginate"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _moment = _interopRequireDefault(require("moment"));

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

;
;
;

function getAdmin(req, res, next) {
  console.log(req.params);
  console.log(req.params.id);

  try {
    if (req.params.id) {
      _admin2["default"].findById({
        _id: req.params.id,
        visible: true
      }, function (err, admin) {
        console.log(err, admin);
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!admin || admin.length < 1) return res.status(404).send({
          message: 'El admin no existe'
        }); //if (admin &&  admin.length > 1)

        return res.status(200).send({
          admin: admin
        });
      });
    } else {
      return res.status(500).send('No admins with Id');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

function getAdmins(profile) {
  try {
    var results = _admin2["default"].find({
      visible: true,
      notify: true,
      profile: profile,
      role: 'admin' || 'Admin'
      /*$and:[
          {$or:[{lastCall:{ $exists: false }}]}, 
          {$or:[{lastCall: {"$gte": moment().format(),"$lt":moment().subtract(7, 'days')}}]}
      ]*/

    }); //console.log('-'+ admins) 


    return results;
  } catch (error) {}
}

function getLoginAdmin(req, res, next) {
  var admin = new _admin2["default"]({
    visible: true,
    profile: req.body.profile,
    email: req.body.email,
    password: Bcrypt.compareSync(request.body.password, admin.password)
  });
  console.log('body', req.body);
  console.log('admin', admin);

  try {
    _admin2["default"].find({
      visible: true,
      profile: req.body.profile,
      email: req.body.email,
      password: Bcrypt.compareSync(request.body.password, admin.password)
    }
    /*$and:[
        {$or:[{lastCall:{ $exists: false }}]}, 
        {$or:[{lastCall: {"$gte": moment().format(),"$lt":moment().subtract(7, 'days')}}]}
    ]*/
    , {}).exec(function (err, _admin) {
      console.log(err, '-', _admin);
      if (err) return res.status(500).send({
        message: 'Error en la peticion'
      });
      if (!_admin) return res.status(404).send({
        message: 'No hay Admins disponibles'
      }); //if (_admin) 

      return res.status(200).send(_admin[0]);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
}

function saveAdmin(admin) {
  var res;

  var _admin = new _admin2["default"](admin);

  console.log('114' + _admin);

  try {
    _admin2["default"].create(_admin, {
      "new": true
    }, function (err, __admin) {
      res = __admin;
      if (err) res.status(500).send(err);else res.status(200).send('Admin created');
    });

    return res;
  } catch (error) {
    return error;
  }
}

function updateCallerAdmin(req, res, next) {
  var admin = req.body;
  var id = req.params.id;

  try {
    admin.lastCall = (0, _moment["default"])().format();

    _admin2["default"].findByIdAndUpdate(id, admin, {
      "new": true
    }, function (err, _admin) {
      console.log('updateAdmin', err);
      if (err) return res.status(500).send({
        message: 'Error en la peticion'
      });
      if (!_admin) return res.status(404).send({
        message: 'No hay Admins disponibles'
      }); //if (_admin) 

      return res.status(200).send({
        message: "Admin updated"
      });
    });
  } catch (error) {
    return res.status(500).send(error);
  }

  next();
}

function updateAdmin(req, res, next) {
  if (req.params.id) {
    try {
      var update = req.body;
      update.visible = true;

      _admin2["default"].findByIdAndUpdate(req.params.id, update, {
        "new": true
      }, function (err, _admin) {
        console.log('updateAdmin', err);
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!_admin) return res.status(404).send({
          message: 'No hay Admins disponibles'
        }); //if (_admin) 

        return res.status(200).send({
          message: "Admin updated"
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    console.log('0' + req.body);
    console.log('1' + _admin2["default"]);
    request.body.password = Bcrypt.hashSync(request.body.password, 10);
    var admin = new _admin2["default"](req.body);

    try {
      _admin2["default"].create(admin, function (err, _admin) {
        console.log(err);
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!_admin) return res.status(404).send({
          message: 'No hay Admins disponibles'
        });
        return res.status(200).send({
          message: "Admin created"
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  } //next();

}

function deleteAdmin(req, res, next) {
  try {
    _admin2["default"].findByIdAndUpdate(req.params.id, {
      visible: false
    }, function (err, _admin) {
      if (err) return res.status(500).send({
        message: 'Error en la peticion'
      });
      if (!_admin) return res.status(404).send({
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

function updateKeyAdmin(req, res, next) {
  var key = req.params.key;
  var admin = {};
  admin[key] = _utils["default"].valueToBoolean(req.params.value);

  try {
    _admin2["default"].findByIdAndUpdate(req.params.id, admin, function (err, _admin) {
      console.log(_admin, 'updateAdmin', err);
      if (err) return res.status(500).send({
        message: 'Error en la peticion'
      });
      if (!_admin) return res.status(404).send({
        message: 'No hay Admins disponibles'
      }); //if (_admin) 

      return res.status(200).send({
        message: "Admin updated"
      });
    });
  } catch (error) {
    return res.status(500).send(error);
  } //next();

}

module.exports = {
  getAdmin: getAdmin,
  getAdmins: getAdmins,
  saveAdmin: saveAdmin,
  updateCallerAdmin: updateCallerAdmin,
  deleteAdmin: deleteAdmin,
  updateAdmin: updateAdmin,
  getLoginAdmin: getLoginAdmin,
  updateKeyAdmin: updateKeyAdmin
};