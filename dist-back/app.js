"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _https = _interopRequireDefault(require("https"));

var _os = _interopRequireDefault(require("os"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var controllers = _interopRequireWildcard(require("./controllers/controllers"));

var _index = _interopRequireDefault(require("./routes/index"));

var _users = _interopRequireDefault(require("./routes/users"));

var _item = _interopRequireDefault(require("./routes/item"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _lodash = _interopRequireDefault(require("lodash"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log(process.env);
console.log(_path["default"].join(__dirname, '../back/.env'));
console.log(_dotenv["default"].config({
  path: _path["default"].join(__dirname, '../back/.env')
}));
var app = (0, _express["default"])();
var port = 3800;
var nameApp = 'Cunino';
_mongoose["default"].Promise = global.Promise;

_mongoose["default"].connect("mongodb://localhost:27017/".concat(nameApp), {
  useNewUrlParser: true
}).then(function () {
  console.log("Conexion a Base de datos ".concat(nameApp, " OK, ").concat(process.env.NAME_APP)); //Creando servidor
  // app.listen(port, () => {

  /*var api = express.Router();
  var app = express();
  initApplication(app, api);
  console.log("Corriendo")*/
  //})
})["catch"](function (err) {
  return console.log('err', err);
});

var initApplication = function initApplication(app, router) {
  app = app || (0, _express["default"])();
  router = router || _express["default"].Router();
  app.use((0, _morgan["default"])('dev'));
  app.use(_express["default"].json());
  app.use(_express["default"].urlencoded({
    extended: false
  }));
  app.use((0, _cookieParser["default"])());
  app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public')));
  app.use('/', _index["default"]);
  /*app.use('/admin', adminRouter)
  app.use('/cashflow', cashflowRouter)
  app.use('/delivery', deliveryRouter)
  app.use('/history', historyRouter)
  app.use('/item', itemRouter)
  app.use('/stock', stockRouter)
  app.use('/user', usersRouter);*/

  if ("dev" === process.env.NODE_ENV) {
    var server;

    if (process.env.HTTPS) {
      //fix ssl localhost
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      server = _https["default"].createServer({
        key: _fs["default"].readFileSync(__dirname + "/ssl/server.key"),
        cert: _fs["default"].readFileSync(__dirname + "/ssl/server.crt"),
        ca: _fs["default"].readFileSync(__dirname + "/ssl/ca.crt"),
        requestCert: true,
        rejectUnauthorized: false
      }, app);
    } else {
      server = _http["default"].createServer(app);
    }

    server.listen(process.env.PORT || 3000, process.env.HOST, function () {
      console.log("up and running @: ".concat(_os["default"].hostname(), " on port: ").concat(process.env.PORT || 3000));
      console.log("enviroment: ".concat(process.env.NODE_ENV || "Development"));
    });
  } // error handlers


  app.use(function (err, req, res, next) {
    var statusCode = req.status || req.statusCode || err.code || err.statusCode || 500;
    var msg = !_lodash["default"].isEmpty(err.message) ? !_lodash["default"].isEmpty(err.message.sqlMessage) ? err.message.sqlMessage : err.message : "Something went wrong";
    return res.status(statusCode).json({
      data: null,
      message: msg
    });
  });
};

console.log("ENV", process.env.NODE_ENV);

if ("dev" == process.env.NODE_ENV) {
  initApplication();
} else {
  module.exports.init = function (app, router) {
    return initApplication(app, router);
  };
}

var _default = app;
exports["default"] = _default;