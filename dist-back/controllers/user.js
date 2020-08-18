"use strict";

var _user2 = _interopRequireDefault(require("../models/user"));

var _mongoosePaginate = _interopRequireDefault(require("mongoose-paginate"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _moment = _interopRequireDefault(require("moment"));

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

;
;
;

function getUser(req, res, next) {
  console.log(req.params);
  console.log(req.params.id);

  try {
    if (req.params.id) {
      _user2["default"].findById({
        _id: req.params.id,
        visible: true
      }, function (err, user) {
        console.log(err, user);
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!user || user.length < 1) return res.status(404).send({
          message: 'El user no existe'
        }); //if (user &&  user.length > 1)

        return res.status(200).send({
          user: user
        });
      });
    } else {
      return res.status(500).send('No users with Id');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

function getUsers(profile) {
  try {
    var results = _user2["default"].find({
      visible: true,
      notify: true,
      profile: profile,
      role: 'user' || 'User'
      /*$and:[
          {$or:[{lastCall:{ $exists: false }}]}, 
          {$or:[{lastCall: {"$gte": moment().format(),"$lt":moment().subtract(7, 'days')}}]}
      ]*/

    }); //console.log('-'+ users) 


    return results;
  } catch (error) {}
}

function getLoginUser(req, res, next) {
  var user = new _user2["default"]({
    visible: true,
    profile: req.body.profile,
    email: req.body.email,
    password: Bcrypt.compareSync(request.body.password, user.password)
  });
  console.log('body', req.body);
  console.log('user', user);

  try {
    _user2["default"].find({
      visible: true,
      profile: req.body.profile,
      email: req.body.email,
      password: Bcrypt.compareSync(request.body.password, user.password)
    }
    /*$and:[
        {$or:[{lastCall:{ $exists: false }}]}, 
        {$or:[{lastCall: {"$gte": moment().format(),"$lt":moment().subtract(7, 'days')}}]}
    ]*/
    , {}).exec(function (err, _user) {
      console.log(err, '-', _user);
      if (err) return res.status(500).send({
        message: 'Error en la peticion'
      });
      if (!_user) return res.status(404).send({
        message: 'No hay Users disponibles'
      }); //if (_user) 

      return res.status(200).send(_user[0]);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
}

function saveUser(user) {
  var res;

  var _user = new _user2["default"](user);

  console.log('114' + _user);

  try {
    _user2["default"].create(_user, {
      "new": true
    }, function (err, __user) {
      res = __user;
      if (err) res.status(500).send(err);else res.status(200).send('User created');
    });

    return res;
  } catch (error) {
    return error;
  }
}

function updateCallerUser(req, res, next) {
  var user = req.body;
  var id = req.params.id;

  try {
    user.lastCall = (0, _moment["default"])().format();

    _user2["default"].findByIdAndUpdate(id, user, {
      "new": true
    }, function (err, _user) {
      console.log('updateUser', err);
      if (err) return res.status(500).send({
        message: 'Error en la peticion'
      });
      if (!_user) return res.status(404).send({
        message: 'No hay Users disponibles'
      }); //if (_user) 

      return res.status(200).send({
        message: "User updated"
      });
    });
  } catch (error) {
    return res.status(500).send(error);
  }

  next();
}

function updateUser(req, res, next) {
  if (req.params.id) {
    try {
      var update = req.body;
      update.visible = true;

      _user2["default"].findByIdAndUpdate(req.params.id, update, {
        "new": true
      }, function (err, _user) {
        console.log('updateUser', err);
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!_user) return res.status(404).send({
          message: 'No hay Users disponibles'
        }); //if (_user) 

        return res.status(200).send({
          message: "User updated"
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  } else {
    console.log('0' + req.body);
    console.log('1' + _user2["default"]);
    request.body.password = Bcrypt.hashSync(request.body.password, 10);
    var user = new _user2["default"](req.body);

    try {
      _user2["default"].create(user, function (err, _user) {
        console.log(err);
        if (err) return res.status(500).send({
          message: 'Error en la peticion'
        });
        if (!_user) return res.status(404).send({
          message: 'No hay Users disponibles'
        });
        return res.status(200).send({
          message: "User created"
        });
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  } //next();

}

function deleteUser(req, res, next) {
  try {
    _user2["default"].findByIdAndUpdate(req.params.id, {
      visible: false
    }, function (err, _user) {
      if (err) return res.status(500).send({
        message: 'Error en la peticion'
      });
      if (!_user) return res.status(404).send({
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

function updateKeyUser(req, res, next) {
  var key = req.params.key;
  var user = {};
  user[key] = _utils["default"].valueToBoolean(req.params.value);

  try {
    _user2["default"].findByIdAndUpdate(req.params.id, user, function (err, _user) {
      console.log(_user, 'updateUser', err);
      if (err) return res.status(500).send({
        message: 'Error en la peticion'
      });
      if (!_user) return res.status(404).send({
        message: 'No hay Users disponibles'
      }); //if (_user) 

      return res.status(200).send({
        message: "User updated"
      });
    });
  } catch (error) {
    return res.status(500).send(error);
  } //next();

}

module.exports = {
  getUser: getUser,
  getUsers: getUsers,
  saveUser: saveUser,
  updateCallerUser: updateCallerUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  getLoginUser: getLoginUser,
  updateKeyUser: updateKeyUser
};